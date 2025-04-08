<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ProductCategory::with('parentCat')->where(function ($query) {
            $query->where('status', 'active')
                ->orWhere('created_by', Auth::id());
        })->get();

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
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = ProductCategory::create([
            'name' => $request->name,
            'slug' => isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name), // Generate slug automatically
            'description' => $request->description,
            'title' => $request->title,
            'from_platform' => 'operations',
            'created_by' => Auth::user()->_id,
            'approval_status' => 'submitted',
            'parent_category' => $request->parent_category,
            'status' => 'inactive',
        ]);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'ProductCategory',
                'entity_id' => $category->_id,
                'old_data' => null,
                'new_data' => $request->all(),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = ProductCategory::with('revisions.reviews', 'parentCat')->find($id);

        if (!$category) {
            return response()->json(['error' => 'Product Category Not Found'], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ProductCategory::select('_id', 'name', 'slug', 'description', 'title', 'created_at')->find($id);
        $oldcategory = clone $category;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable',
            'title' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (!$category) {
            return response()->json(['error' => 'Blog Category Not Found'], 404);
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
                'entity_type' => 'ProductCategory',
                'entity_id' => $category->_id,
                'old_data' => $oldcategory,
                'new_data' => $category,
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($oldcategory = ProductCategory::find($id), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = ProductCategory::find($id);

        if (!$category) {
            return response()->json(['error' => 'Product Category Not Found'], 200);
        }

        $category->delete();
        return response()->json(['message' => 'Product Category Deleted Successfully'], 200);
    }

    public function activeProductCategories()
    {
        $data = ProductCategory::where('status', 'active')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
