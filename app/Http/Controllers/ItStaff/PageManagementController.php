<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\PageManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PageManagement::with('sections')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bg_image' => 'nullable|mimes:png,jpg,jpeg,webp',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $validated = $request->except('bg_image');
        if ($request->hasFile('bg_image')) {
            $filePath = $request->file('bg_image')->store('pages', 'public');
            $validated['bg_image'] = Storage::url($filePath);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->title);

        $page = PageManagement::create($validated);

        return response()->json(['data' => $page, 'message' => 'Data found'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = PageManagement::with('sections')->find($id);
        if (!$data) {
            return response()->json(['error' => 'Data Not Found'], 404);
        }
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $page = PageManagement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'bg_image' => 'nullable|mimes:png,jpg,jpeg,webp',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $validated = $request->except('bg_image');
        if ($request->hasFile('bg_image')) {
            $filePath = $request->file('bg_image')->store('pages', 'public');
            $validated['bg_image'] = Storage::url($filePath);
        }

        if ($request->has('slug')) {
            $validated['slug'] = Str::slug($request->slug);
        }

        $page->update($validated);

        return response()->json($page);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = PageManagement::find($id);
        if (!$data) {
            return response()->json(['error' => 'Data Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data deleted successfully']);
    }
}
