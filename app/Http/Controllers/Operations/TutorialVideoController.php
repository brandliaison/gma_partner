<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\TutorialVideo;
use App\Models\OP\TutorialVideoCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TutorialVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = TutorialVideo::with('category', 'revisions')->get();
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
        $category = TutorialVideoCategory::find($request->tutorial_video_category_id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tutorial_video_category_id' => 'required|exists:tutorial_video_categories,_id',
            'video_url' => 'required',
            'thumbnail_url' => 'nullable|mimes:png,jpg,jpeg',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        // if ($category->status !== 'active') {
        //     return response()->json(['error' => 'Tutorial Category Not Found'], 404);
        // }

        // $validated = $request->except('video_url');
        $validated = $request->except('thumbnail_url');
        if ($request->hasFile('thumbnail_url')) {
            $filePath = $request->file('thumbnail_url')->store('tutorial-video-thumbnail', 'public');
            $validated['thumbnail_url'] = Storage::url($filePath);
        }
        // if ($request->hasFile('video_url')) {
        //     $filePath = $request->file('video_url')->store('tutorial-video', 'public');
        //     $validated['video_url'] = Storage::url($filePath);
        // }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);
        $validated['status'] = 'inactive';
        $validated['approval_status'] = 'submitted';
        $validated['created_by'] = Auth::user()->_id;

        $data = TutorialVideo::create($validated);
        if ($data) {
            EntityRevision::create([
                'entity_type' => 'TutorialVideo',
                'entity_id' => $data->_id,
                'old_data' => null,
                'new_data' => $data->with('category')->find($data->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = TutorialVideo::with('category', 'revisions.reviews')->find($id);
        if (!$data) {
            return response()->json(['error' => 'Tutorial Video Not Found'], 404);
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
        $category = TutorialVideoCategory::find($request->tutorial_video_category_id);

        $data = TutorialVideo::with('category')->find($id);
        $oldData = clone $data;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tutorial_video_category_id' => 'required|exists:tutorial_video_categories,_id',
            'video_url' => 'required',
            'thumbnail_url' => 'nullable|mimes:png,jpg,jpeg',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        // if ($category->status !== 'active') {
        //     return response()->json(['error' => 'Tutorial Video Category Not Found'], 404);
        // }

        if (!$data) {
            return response()->json(['error' => 'Tutorial Video Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        // $validated = $request->except('video_url');
        $validated = $request->except('thumbnail_url');
        if ($request->hasFile('thumbnail_url')) {
            $filePath = $request->file('thumbnail_url')->store('tutorial-video-thumbnail', 'public');
            $validated['thumbnail_url'] = Storage::url($filePath);
        }
        // if ($request->hasFile('video_url')) {
        //     $filePath = $request->file('video_url')->store('tutorial-video', 'public');
        //     $validated['video_url'] = Storage::url($filePath);
        // }

        $data->update($validated);

        if ($data) {
            EntityRevision::create([
                'entity_type' => 'TutorialVideo',
                'entity_id' => $data->_id,
                'old_data' => $oldData,
                'new_data' => TutorialVideo::with('category')->find($data->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = TutorialVideo::find($id);
        if (!$data) {
            return response()->json(['error' => 'Tutorial Video  Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Tutorial Video deleted successfully']);
    }
}
