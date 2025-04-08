<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\OpStaff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class OpStaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(OpStaff::all());
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:op_staffs,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'status' => 'required|string',
            'op_designation_id' => 'nullable',
        ]);

        $data = $request->except('profile_image');
        if ($request->hasFile('profile_image')) {
            $filePath = $request->file('profile_image')->store('op-staff-profiles', 'public');
            $data['profile_image'] = Storage::url($filePath);
        }

        $user = Auth::user(); // Get authenticated user
        if (array_key_exists('it_designation_id', $user->toArray())) {
            $data['parent_staff_type'] = 'IT Admin';
        } elseif (array_key_exists('op_designation_id', $user->toArray())) {
            $data['parent_staff_type'] = 'OP Admin';
        } else {
            $data['parent_staff_type'] = 'Other';
        }

        $data['password'] = Hash::make($request->password);
        $data['parent_staff_id'] = Auth::id();
        $data['status'] = 1;
        $opStaff = OpStaff::create($data);

        // Assign role (if using Spatie)
        if ($request->has('role')) {
            $opStaff->assignRole($request->role);
        }

        return response()->json(['message' => 'OP Staff Created', 'data' => $opStaff], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $opStaff = OpStaff::find($id);
        if (!$opStaff) {
            return response()->json(['message' => 'OP Staff Not Found'], 404);
        }
        return response()->json($opStaff);
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
        $staff = OpStaff::find($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'status' => 'nullable',
            'op_designation_id' => 'nullable',
        ]);

        $data = $request->except('profile_image');
        if ($request->hasFile('profile_image')) {
            $oldFile = str_replace('/storage/', '', $staff->profile_image);
            Storage::disk('public')->delete($oldFile);
            $filePath = $request->file('profile_image')->store('op-staff-profiles', 'public');
            $data['profile_image'] = Storage::url($filePath);
        }

        $staff->update($data);

        // Assign role (if using Spatie)
        if ($request->has('role')) {
            $staff->syncRoles($request->role);
        }

        return response()->json(['message' => 'OP Staff Updated', 'data' => $staff], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $opStaff = OpStaff::find($id);
        if (!$opStaff) {
            return response()->json(['message' => 'OP Staff Not Found'], 404);
        }

        $opStaff->delete();
        return response()->json(['message' => 'OP Staff Deleted']);
    }
}
