<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ServiceCategory::where(function ($query) {
            $query->where('status', 'active')
                  ->orWhere('created_by', Auth::id());
        })
        ->with('firstAppoveruser', 'finalAppoveruser', 'parentCat')
        ->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    // Store (Create) a New Service Category
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = ServiceCategory::create([
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
                'entity_type' => 'ServiceCategory',
                'entity_id' => $category->_id,
                'old_data' => null,
                'new_data' => $request->all(),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }
        return response()->json($category, 201);
    }

    // Show a Single Service Category
    public function show($id)
    {
        $category = ServiceCategory::with('firstAppoveruser', 'finalAppoveruser', 'revisions.reviews', 'parentCat')->find($id);

        if (!$category) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
        }

        return response()->json($category, 200);
    }

    // Update a Service Category
    public function update(Request $request, $id)
    {
        $category = ServiceCategory::select('_id', 'name', 'slug', 'description', 'title', 'created_at')->find($id);
        $oldcategory = clone $category;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable',
            'title' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (!$category) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
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
                'entity_type' => 'ServiceCategory',
                'entity_id' => $category->_id,
                'old_data' => $oldcategory,
                'new_data' => $category,
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($oldcategory = ServiceCategory::find($id), 200);
    }

    // Delete a Service Category
    public function destroy($id)
    {
        $category = ServiceCategory::find($id);

        if (!$category) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Service Category Deleted Successfully'], 200);
    }

    public function activeServiceCategories(){
        $data = ServiceCategory::where('status', 'active')
        ->with('firstAppoveruser', 'finalAppoveruser')
        ->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
