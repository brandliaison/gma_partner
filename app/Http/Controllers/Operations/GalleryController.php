<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Gallery::where('status', 'active')->latest()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'required|mimes:png,jpg,jpeg',
            'image_alt' => 'nullable|string|max:255',
        ]);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('gallery', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $validated['status'] = 'active';
        $gallery = Gallery::create($validated);
        return response()->json(['message' => 'Gallery created successfully', 'data' => $gallery], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $gallery = Gallery::find($id);
        if (!$gallery) {
            return response()->json(['error' => 'Gallery Not Found'], 404);
        }
        return response()->json($gallery);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $gallery = Gallery::find($id);
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'required|mimes:png,jpg,jpeg',
            'image_alt' => 'nullable|string|max:255',
            'status' => 'sometimes|string|in:active,inactive',
        ]);

        $validated = $request->except('image_url');

        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('gallery', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $gallery->update($validated);
        return response()->json(['message' => 'Gallery updated successfully', 'data' => $gallery], 200);
    }

    // 🔹 Soft delete gallery item
    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted successfully'], 200);
    }
}
