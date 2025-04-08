<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PageSection::with('page')->get();

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
            'page_id' => 'required|exists:page_management,_id',
            'image' => 'nullable|mimes:png,jpg,jpeg,webp',
            'content' => 'nullable',
            'order' => 'nullable|integer',
            'status' => 'required|in:active,inactive',
        ]);

        $validated = $request->except('image');
        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('page-sections', 'public');
            $validated['image'] = Storage::url($filePath);
        }

        $validated['slug'] = Str::slug($request->slug ?? 'section-' . time());

        $section = PageSection::create($validated);

        return response()->json(['data' => $section, 'message' => 'Data found'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = PageSection::with('page')->find($id);
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
        $section = PageSection::findOrFail($id);

        $validated = $request->validate([
            'image' => 'nullable|string',
            'content' => 'nullable|string',
            'order' => 'sometimes|integer',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $validated = $request->except('image');
        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('page-sections', 'public');
            $validated['image'] = Storage::url($filePath);
        }

        if ($request->has('slug')) {
            $validated['slug'] = Str::slug($request->slug);
        }

        $section->update($validated);

        return response()->json($section);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = PageSection::find($id);
        if (!$data) {
            return response()->json(['error' => 'Data Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data deleted successfully']);
    }
}
