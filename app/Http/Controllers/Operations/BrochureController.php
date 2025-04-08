<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Brochure;
use App\Models\OP\BrochureCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrochureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Brochure::with('category')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = BrochureCategory::find($request->category_id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:brochure_categories,_id',
            'file_path' => 'nullable|mimes:pdf',
        ]);

        if ($category->status !== 'active') {
            return response()->json(['error' => 'Brochure Category Not Found'], 404);
        }

        $validated = $request->except('file_path');
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('brochure', 'public');
            $validated['file_path'] = Storage::url($filePath);
        }

        $validated['status'] = 'active';

        $data = Brochure::create($validated);

        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Brochure::with(('category'))->find($id);
        if (!$data) {
            return response()->json(['error' => 'Brochure Not Found'], 404);
        }
        return response()->json($data->load('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = BrochureCategory::find($request->category_id);
        $data =  Brochure::with('category')->find($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:brochure_categories,_id',
            'file_path' => 'nullable|mimes:pdf',
        ]);

        if ($category->status !== 'active') {
            return response()->json(['error' => 'Brochure Category Not Found'], 404);
        }

        $validated = $request->except('file_path');
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('brochure', 'public');
            $validated['file_path'] = Storage::url($filePath);
        }

        $validated['status'] = 'active';

        $data->update($validated);

        return response()->json($data, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Brochure::find($id);
        if (!$data) {
            return response()->json(['error' => 'Brochure Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Brochure deleted successfully']);
    }
}
