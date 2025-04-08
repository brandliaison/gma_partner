<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\FaqCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FaqCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = FaqCategory::with('parentCat')->where(function ($query) {
            $query->where('status', 'active')
                  ->orWhere('created_by', Auth::id());
        })
        ->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:faq_categories,name',
            'description' => 'nullable',
        ]);

        $category = FaqCategory::create([
            'name' => $request->name,
            'slug' => isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name),
            'description' => $request->description,
            'posted_by' => Auth::user()->_id,
            'from_platform' => 'operations',
            'approval_status' => 'submitted',
            'parent_category' => $request->parent_category,
            'created_by' => Auth::user()->_id,
            'status' => 'inactive',
        ]);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'FaqCategory',
                'entity_id' => $category->_id,
                'old_data' => null,
                'new_data' => $request->all(),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json(['message' => 'Category created successfully', 'data' => $category], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = FaqCategory::with('revisions.reviews', 'parentCat')->findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = FaqCategory::find($id);
        $oldcategory = clone $category;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable',
            'title' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (!$category) {
            return response()->json(['error' => 'Category Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        // Update category
        $category->update([
            'name' => $request->name ?? $oldcategory->name,
            'slug' => $request->slug ? Str::slug($request->slug) : $oldcategory->slug,
            'description' => $request->description ?? $oldcategory->description,
            'title' => $request->title ?? $oldcategory->title,
            'parent_category' => $request->parent_category ?? $oldcategory->parent_category,
        ]);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'FaqCategory',
                'entity_id' => $category->_id,
                'old_data' => $oldcategory,
                'new_data' => $category,
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json(['message' => 'Category updated successfully', 'data' => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = FaqCategory::findOrFail($id);

        if (!$category) {
            return response()->json(['error' => 'Category Not Found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }

    public function activeFaqCategories()
    {
        $data = FaqCategory::where('status', 'active')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
