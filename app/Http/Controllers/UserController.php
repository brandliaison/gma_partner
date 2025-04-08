<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|unique:users,phone',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Generate OTPs
        $phoneOtp = rand(100000, 999999);
        $emailOtp = rand(100000, 999999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'phone_otp' => $phoneOtp,
            'email_otp' => $emailOtp,
            'phone_verified_at' => null,
            'email_verified_at' => null,
            'status' => 'pending', // Set status as 'pending' until verified
        ]);

        return response()->json([
            'message' => 'User registered successfully. Please verify your email & phone.',
            'user' => $user
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($validate)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['data' => $token, 'status' => true], 200);
        } else {
            return response()->json(['status' => false], 400);
        }
    }

    public function verifyPhone(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|exists:users,phone',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('phone', $request->phone)->first();

        if (!$user || $user->phone_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        // Mark phone as verified
        $user->update([
            'phone_verified_at' => Carbon::now(),
            'phone_otp' => null // Clear OTP after successful verification
        ]);
        if($user->email_verified_at !== null){
            $user->update([
                'status' => 'active',
            ]);
        }

        return response()->json(['message' => 'Phone number verified successfully.']);
    }

    /**
     * Verify Email OTP
     */
    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        // Mark email as verified
        $user->update([
            'email_verified_at' => Carbon::now(),
            'email_otp' => null // Clear OTP after successful verification
        ]);

        if($user->phone_verified_at !== null){
            $user->update([
                'status' => 'active',
            ]);
        }

        return response()->json(['message' => 'Email verified successfully.']);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Generate OTP (6-digit random number)
        $otp = rand(100000, 999999);

        // Save OTP & expiry time in the user table
        $user->update([
            'email_otp' => $otp,
        ]);

        // Send OTP via email
        Mail::raw("Your password reset OTP is: $otp", function ($message) use ($user) {
            $message->to($user->email)->subject('Password Reset OTP');
        });

        return response()->json(['message' => 'OTP sent to your email.']);
    }

    public function verifyResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        // Update password & clear OTP
        $user->update([
            'password' => Hash::make($request->password),
            'email_otp' => null,
        ]);

        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function updateProfile(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'profile_photo' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'state' => 'nullable|string',
            'district' => 'nullable|string',
            'city' => 'nullable|string',
            'pincode' => 'nullable|string',
            'website' => 'nullable|url',
            'company_name' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::find(Auth::id());

        // Handle Profile Photo Upload
        $profilePhotoPath = null;
        if ($request->hasFile('profile_photo')) {
            $profilePhotoPath = $request->file('profile_photo')->store('profile-photos', 'public');
        }

        // Create user
        $user = $user->update([
            'name' => $request->name,
            'profile_photo' => $profilePhotoPath ? Storage::url($profilePhotoPath) : $user->profile_photo,
            'address' => $request->address,
            'country' => $request->country,
            'state' => $request->state,
            'district' => $request->district,
            'city' => $request->city,
            'pincode' => $request->pincode,
            'website' => $request->website,
            'company_name' => $request->company_name,
        ]);

        return response()->json([
            'message' => 'Profile Update successfully.',
            'user' => User::find(Auth::id())
        ], 201);
    }
}
