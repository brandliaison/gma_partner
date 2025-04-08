<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\RequestCallback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestCallbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(RequestCallback::latest()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'country_code' => 'required|string|max:5',
            'phone' => 'required|string|max:15',
            'country' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'message' => 'required|string',
            'time' => 'required|string',
        ]);

        $validated['status'] = 'pending';

        $enquiry = RequestCallback::create($validated);
        return response()->json(['message' => 'Enquiry submitted successfully', 'data' => $enquiry], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $enquiry = RequestCallback::find($id);

        $validated = $request->validate([
            'replied' => 'nullable|string|in:yes,no',
            'reply_via' => 'nullable|string|in:email,phone',
            'status' => 'nullable|string|in:pending,replied,resolved',
        ]);

        $validated['reply_by'] = Auth::id(); // Staff ID

        $enquiry->update($validated);
        return response()->json(['message' => 'Enquiry updated successfully', 'data' => $enquiry], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = RequestCallback::find($id);
        if (!$data) {
            return response()->json(['error' => 'Request Callback Enquries Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Request Callback Enquries deleted successfully']);
    }
}
