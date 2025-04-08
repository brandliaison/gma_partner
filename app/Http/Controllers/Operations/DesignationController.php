<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\OpDesignation;
use Illuminate\Http\Request;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get = OpDesignation::get();
        return response()->json($get, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'Name field is required!'
            ]
        );

        $validated['status'] = 1;

        $save = OpDesignation::create($validated);

        return response()->json($save, 201);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        $designation = OpDesignation::find($id);
        return response()->json($designation, 201);
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
        $designation = OpDesignation::find($id);

        if (isset($request->status)) {
            $rule = [
                'status' => 'required',
            ];
        } else {
            $rule = [
                'name' => 'required',
            ];
        }

        $validated = $request->validate($rule);
        $save = $designation->update($validated);

        $designation = OpDesignation::find($id);
        return response()->json($designation, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $designation = OpDesignation::find($id);
        $delete = $designation->delete();
        return response()->json($delete, 201);
    }
}
