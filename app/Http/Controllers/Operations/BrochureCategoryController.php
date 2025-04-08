<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\BrochureCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BrochureCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(BrochureCategory::get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:brochure_categories,name,',
            'status' => 'sometimes|string|in:active,inactive',
        ]);

        $category = BrochureCategory::create([
            'name' => $request->name,
            'posted_by' => Auth::id(),
            'status' => $request->status ?? 'active',
        ]);
        return response()->json(['message' => 'Category created successfully', 'data' => $category], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = BrochureCategory::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brochureCategory = BrochureCategory::find($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:active,inactive',
        ]);

        $brochureCategory->update($validated);
        return response()->json(['message' => 'Category updated successfully', 'data' => $brochureCategory], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = BrochureCategory::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
