<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\ItStaff;
use App\Models\OP\OpStaff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ItStaff::whereNot('role', 'it_super_admin')->get();

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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:it_staffs,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'status' => 'required|string',
            'it_designation_id' => 'nullable',
        ]);

        $data = $request->except('profile_image');
        if ($request->hasFile('profile_image')) {
            $filePath = $request->file('profile_image')->store('it-staff-profiles', 'public');
            $data['profile_image'] = Storage::url($filePath);
        }

        $data['password'] = Hash::make($request->password);
        $data['parent_staff_id'] = Auth::id();
        $data['status'] = 1;
        $itStaff = ItStaff::create($data);

        // Assign role (if using Spatie)
        if ($request->has('role')) {
            $itStaff->assignRole($request->role);
        }

        return response()->json(['message' => 'IT Staff Created', 'data' => $itStaff], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $itStaff = ITStaff::find($id);
        if (!$itStaff) {
            return response()->json(['message' => 'IT Staff Not Found'], 404);
        }
        return response()->json(['data' => $itStaff, 'message' => 'Data Found'], 200);
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
        $staff = ItStaff::find($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'status' => 'nullable',
            'it_designation_id' => 'nullable',
        ]);

        $data = $request->except('profile_image');
        if ($request->hasFile('profile_image')) {
            $oldFile = str_replace('/storage/', '', $staff->profile_image);
            Storage::disk('public')->delete($oldFile);
            $filePath = $request->file('profile_image')->store('it-staff-profiles', 'public');
            $data['profile_image'] = Storage::url($filePath);
        }

        $staff->update($data);

        // Assign role (if using Spatie)
        if ($request->has('role')) {
            $staff->syncRoles($request->role);
        }

        return response()->json(['message' => 'IT Staff Updated', 'data' => $staff], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $itStaff = ITStaff::find($id);
        if (!$itStaff) {
            return response()->json(['message' => 'IT Staff Not Found'], 404);
        }

        $itStaff->delete();
        return response()->json(['message' => 'IT Staff Deleted']);
    }

    public function changePassword(Request $request)
    {
        // Validate input
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();

        // Check if current password matches the database
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        // Update the new password (hashed)
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json(['message' => 'Password changed successfully!'], 200);
    }

    public function changeStaffPassword(Request $request)
    {
        // Validate input
        $request->validate([
            'staff_type' => 'required',
            'self_password' => 'required',
            'new_staff_password' => 'required|min:8',
        ]);

        $user = Auth::user();

        // Check if current password matches the database
        if (!Hash::check($request->self_password, $user->password)) {
            return response()->json(['error' => 'Password is incorrect'], 400);
        }

        $staff = null;
        if ($request->staff_type == 'IT') {
            $staff = ItStaff::find($request->staff_id);
        } elseif ($request->staff_type == 'OP') {
            $staff = OpStaff::find($request->staff_id);
        }
        if (!$staff) {
            return response()->json(['error' => 'User Not Found!'], 400);
        }

        // Update the new password (hashed)
        $staff->update([
            'password' => Hash::make($request->new_staff_password),
        ]);

        return response()->json(['message' => 'Password changed successfully!'], 200);
    }

    public function changeStaffStatus(Request $request)
    {
        // Validate input
        $request->validate([
            'staff_type' => 'required',
            'staff_id' => 'required',
            'status' => 'required',
        ]);

        $staff = null;
        if ($request->staff_type == 'IT') {
            $staff = ItStaff::find($request->staff_id);
        } elseif ($request->staff_type == 'OP') {
            $staff = OpStaff::find($request->staff_id);
        }
        if (!$staff) {
            return response()->json(['error' => 'User Not Found!'], 400);
        }
        $status = '';
        if($request->status == 1){
            $status = 'Active';
        }elseif($request->status == 0){
            $status = 'Inactive';
        }
        // Update the new password (hashed)
        $staff->update([
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Profile '.$status.' successfully!'], 200);
    }
}
