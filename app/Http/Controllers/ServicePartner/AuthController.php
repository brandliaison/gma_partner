<?php

namespace App\Http\Controllers\ServicePartner;

use App\Http\Controllers\Controller;
use App\Models\ServicePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'mobile' => 'required',
            'password' => 'required',
        ]);

        $user = ServicePartner::where('mobile', $request->mobile)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($user->status == '0') {
            return response()->json(['message' => 'Profile Inactive'], 401);
        }

        // Generate token
        $token = $user->createToken('opstaff_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user, 'message' => 'Login Successful']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
