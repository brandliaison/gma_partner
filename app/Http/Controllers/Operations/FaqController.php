<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Faq;
use App\Models\OP\FaqCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Faq::where(function ($query) {
            $query->where('status', 'active')
                ->orWhere('created_by', Auth::id());
        })->with('category')->get();

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
        $category = FaqCategory::find($request->faq_category_id);

        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'faq_category_id' => 'required|exists:faq_categories,_id',
            'answer' => 'nullable|string',
        ]);

        if ($category->status !== 'active') {
            return response()->json(['error' => 'Category Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);
        $validated['status'] = 'inactive';
        $validated['created_by'] = Auth::user()->_id;

        $data = Faq::create($validated);
        if ($data) {
            EntityRevision::create([
                'entity_type' => 'Faq',
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
        $data = Faq::with('category', 'revisions.reviews')->find($id);
        if (!$data) {
            return response()->json(['error' => 'Faq Not Found'], 404);
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = FaqCategory::find($request->blog_category_id);

        $data =  Faq::with('category')->find($id);
        $oldData = clone $data;

        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'faq_category_id' => 'required|exists:faq_categories,_id',
            'answer' => 'nullable|string',
        ]);

        if ($category->status !== 'active') {
            return response()->json(['error' => 'Faq Category Not Found'], 404);
        }

        if (!$data) {
            return response()->json(['error' => 'Faq Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        $data->update($validated);

        if ($data) {
            EntityRevision::create([
                'entity_type' => 'Blog',
                'entity_id' => $data->_id,
                'old_data' => $oldData,
                'new_data' => Faq::with('category')->find($data->_id),
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
        $data = Faq::find($id);
        if (!$data) {
            return response()->json(['error' => 'Faq Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Faq deleted successfully']);
    }
}
