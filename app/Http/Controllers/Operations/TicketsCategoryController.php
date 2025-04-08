<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\TicketsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TicketsCategoryController extends Controller
{
    // Get All Categories
    public function index()
    {
        return response()->json(TicketsCategory::latest()->get());
    }

    // Create a New Category
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:tickets_categories,name',
            'status' => 'required|in:active,inactive',
        ]);

        $validated['slug'] = Str::slug($validated['name']); // Generate slug

        $category = TicketsCategory::create($validated);

        return response()->json($category, 201);
    }

    // Get Single Category
    public function show($id)
    {
        $category = TicketsCategory::findOrFail($id);
        return response()->json($category);
    }

    // Update Category
    public function update(Request $request, $id)
    {
        $category = TicketsCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|unique:tickets_categories,name,' . $category->id,
            'status' => 'required|in:active,inactive',
        ]);

        $validated['slug'] = Str::slug($validated['name']); // Generate slug

        $category->update($validated);

        return response()->json($category);
    }

    // Delete Category
    public function destroy($id)
    {
        $category = TicketsCategory::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
