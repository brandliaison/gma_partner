<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\ContactEnquries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ContactEnquries::with('repliedBy')->latest()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'country_code' => 'required',
            'phone' => 'required',
            'country' => 'required',
            'organization' => 'required',
            'message' => 'string|nullable',
            'file_path' => 'nullable|mimes:jpg,png,jpeg,pdf',
        ]);

        $validated = $request->except('file_path');
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('enquiries', 'public');
            $validated['file_path'] = Storage::url($filePath);
        }

        $validated['status'] = 'pending';

        $enquiry = ContactEnquries::create($validated);
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
        $enquiry = ContactEnquries::find($id);

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
        $data = ContactEnquries::find($id);
        if (!$data) {
            return response()->json(['error' => 'Contact Enquries Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Contact Enquries deleted successfully']);
    }
}
