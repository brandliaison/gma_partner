<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class WebsiteSettingsController extends Controller
{
    // Get all website settings
    public function index()
    {
        return response()->json(WebsiteSetting::all());
    }

    // Create a new website setting
    public function store(Request $request)
    {
        $rules = [
            'data' => 'required|array',
            'data.*' => 'required|string',
            'data.*' => 'required',
        ];

        // Custom error messages (optional)
        $messages = [
            'data.*.key.required' => 'The key field is required.',
            'data.*.value.required' => 'The value field is required.',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422); // Return validation errors with a 422 status code
        }

        // $data = $request->input('data');

        $i = 0;
        foreach ($request->data as $key => $item) {
            $data = [
                'key' => $item['key'],
                'value' => $item['value'], // Default value
                'status' => $item['status'],
            ];

            // Check if the current item has a file upload using key
            if ($request->hasFile("data.$key.value")) {
                $file = $request->file("data.$key.value");
                $filePath = $file->store('website-settings', 'public'); // ✅ Store file
                $data['value'] = Storage::url($filePath);
            }
            // Store in database
            WebsiteSetting::create($data);
        }

        return response()->json([
            'message' => 'Data Created',
            'data' => WebsiteSetting::get()
        ], 201);
    }

    // Get a single setting by ID
    public function show($id)
    {
        $setting = WebsiteSetting::find($id);
        if (!$setting) {
            return response()->json(['message' => 'Setting Not Found'], 404);
        }
        return response()->json($setting);
    }

    // Update a website setting
    public function update(Request $request, $id)
    {
        $setting = WebsiteSetting::findOrFail($id); // Find the setting by ID

        $data = [
            'key' => $request->key ?? $setting->key,
            'value' => $request->value ?? $setting->value,
            'status' => $request->status ?? $setting->status,
        ];

        // ✅ Check if `value` is a file and update
        if ($request->hasFile('value')) {
            $oldFile = str_replace('/storage/', '', $setting->value);
            Storage::disk('public')->delete($oldFile);

            $file = $request->file('value');
            $filePath = $file->store('website-settings', 'public');
            $data['value'] = Storage::url($filePath); // ✅ Store new file URL
        }

        $setting->update($data); // ✅ Update the record

        return response()->json(['message' => 'Setting updated successfully', 'data' => WebsiteSetting::get()]);
    }

    // Delete a website setting
    public function destroy($id)
    {
        $setting = WebsiteSetting::find($id);
        if ($setting->value && str_contains($setting->value, 'storage/website-settings/')) {
            $oldFile = str_replace('/storage/', '', $setting->value);
            Storage::disk('public')->delete($oldFile);
        }
        if (!$setting) {
            return response()->json(['message' => 'Setting Not Found'], 404);
        }

        $setting->delete();
        return response()->json(['message' => 'Website Setting Deleted', 'data' => WebsiteSetting::get()]);
    }
}
