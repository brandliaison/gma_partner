<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Ticket;
use App\Models\OP\TicketAction;
use App\Models\OP\TicketAttachments;
use App\Models\OP\TicketReply;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    // GET ALL TICKETS
    public function index()
    {
        return response()->json(Ticket::with(['category', 'creator'])->get());
    }

    // CREATE TICKET
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'details' => 'required|string',
            'ticket_category_id' => 'required|exists:tickets_categories,_id',
        ]);

        $validated = $request->except('ticket_files');

        $validated['created_by'] = Auth::id();
        $validated['status'] = 'open';
        $validated['from_platform'] = 'operations';
        $ticket = Ticket::create($validated);

        if ($ticket) {
            $addAction = TicketAction::create(
                [
                    'ticket_id' => $ticket->id,
                    'performed_by' => Auth::id(),
                    'assigned_to' => null,
                    'action_type' => 'created',
                    'action_details' => '',
                ]
            );

            if ($request->hasFile('ticket_files')) {
                $filePath = $request->file('ticket_files')->store('tickets', 'public');
                $ticket_files = Storage::url($filePath);

                TicketAttachments::create(
                    [
                        'ticket_id' => $ticket->id,
                        'ticket_action_id' => $addAction->id,
                        'file_path' => $ticket_files,
                    ]
                );
            }
        }

        return response()->json(['message' => 'Ticket created successfully', 'ticket' => $ticket], 201);
    }

    // GET SINGLE TICKET
    public function show($id)
    {
        $ticket = Ticket::with(['category', 'creator', 'latestAction', 'replies'])
            ->whereHas('latestAction', function ($query) {
                $query->where('assigned_to', Auth::id());
            })
            ->find($id);

        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }
        return response()->json($ticket);
    }

    // UPDATE TICKET
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'subject' => 'sometimes|string|max:255',
            'details' => 'sometimes|string',
            'ticket_category_id' => 'sometimes|exists:tickets_categories,_id',
            'status' => 'sometimes|in:open,in_progress,closed',
            'rating' => 'sometimes|integer|min:1|max:5',
            'feedback' => 'sometimes|string|nullable',
            'ticket_files' => 'sometimes|mimes:png,jpg,jpeg|nullable',
        ]);

        $validated['from_platform'] = 'operations';

        if ($request->has('rating')) {
            $validated['rated_at'] = Carbon::now();
        }

        $validated = $request->except('ticket_files');

        $ticket->update($validated);

        if ($ticket) {
            $addAction = TicketAction::create(
                [
                    'ticket_id' => $ticket->id,
                    'performed_by' => Auth::id(),
                    'assigned_to' => null,
                    'action_type' => 'created',
                    'action_details' => '',
                ]
            );

            if ($request->hasFile('ticket_files')) {
                $filePath = $request->file('ticket_files')->store('tickets', 'public');
                $ticket_files = Storage::url($filePath);

                TicketAttachments::create(
                    [
                        'ticket_id' => $ticket->id,
                        'ticket_action_id' => $addAction->id,
                        'file_path' => $ticket_files,
                    ]
                );
            }
        }

        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    // DELETE TICKET
    public function destroy($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }

    // ASSIGN TICKET
    public function assignTicket(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,_id',
            'assigned_to' => 'required|exists:op_staffs,_id',
            'action_details' => 'nullable|string',
        ]);

        TicketAction::create(
            [
                'ticket_id' => $request->ticket_id,
                'performed_by' => Auth::id(),
                'assigned_to' => $request->assigned_to,
                'action_type' => 'assigned',
                'action_details' => $request->action_details,
            ]
        );
        $ticket = Ticket::find($request->ticket_id);
        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    // UPDATE TICKET STATUS
    public function updateStatus(Request $request)
    {
        $ticket = Ticket::find($request->ticket_id);

        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'status' => 'sometimes|in:open,in_progress,closed',
        ]);

        $ticket->update($validated);
        $ticket = TicketAction::create(
            [
                'ticket_id' => $request->ticket_id,
                'performed_by' => Auth::id(),
                'action_type' => 'changed_status',
                'action_details' => 'Ticket Status Changed',
            ]
        );
        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    //  Reply ticket

    public function replyTicket(Request $request)
    {
        $validated = $request->validate([
            'ticket_id' => 'required|exists:tickets,_id',
            'message' => 'required',
            'attachments' => 'nullable|mimes:png,jpg,jpeg,gif',
        ]);

        $validated = $request->except('attachments');

        if ($request->hasFile('attachments')) {
            $filePath = $request->file('attachments')->store('tickets', 'public');
            $validated['attachments'] = Storage::url($filePath);
        }

        $validated['ticket_id'] = $request->ticket_id;
        $validated['user_id'] = Auth::id();
        $validated['user_type'] = 'operation';
        $validated['message'] = $request->message;
        $validated['from_platform'] = 'operations';

        TicketReply::create($validated);

        $ticket = Ticket::with('replies')->find($request->ticket_id);
        return response()->json(['message' => 'Ticket Replied successfully', 'ticket' => $ticket]);
    }
}
