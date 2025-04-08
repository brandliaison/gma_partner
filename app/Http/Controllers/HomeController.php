<?php

namespace App\Http\Controllers;

use App\CommonHelpers\CommonHelpers;
use App\Mail\EmailOTP;
use App\Models\ChannelPartner;
use App\Models\IT\WebsiteSetting;
use App\Models\OP\Blog;
use App\Models\OP\TutorialVideo;
use App\Models\ServicePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        $data = [];
        $data['bannerData'] = WebsiteSetting::whereIn('key', ['banner_image', 'banner_text1', 'banner_text2'])->get();
        $data['tutorials'] = TutorialVideo::where('status', 'active')->select('_id', 'name', 'video_url', 'description', 'thumbnail_url', 'slug', 'status')->orderBy('created_at', 'desc')->get();
        $data['blogs'] = Blog::where('status', 'active')->select('_id', 'name', 'description', 'image_url', 'slug', 'status')->orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $data], 200);
    }

    public function headerFooter()
    {
        $data = WebsiteSetting::get();
        return response()->json(['data' => $data], 200);
    }

    public function registerServicePartner(Request $request)
    {
        $rules = [
            'reg_type' => 'required',
            'country' => 'required|in:India,Other',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:service_partners,email',
            'mobile' => 'required|unique:service_partners,mobile',
            'alt_mobile' => 'nullable|digits:10',
            'state' => 'required|string',
            'district' => 'required|string',
            'pincode' => 'required|string|max:10',
        ];

        if ($request->reg_type === 'Company') {
            $rules += ['org_name' => 'required'];
            $rules += ['designation' => 'required'];
        }

        // Validate the request
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        // Create user
        $user = ServicePartner::create([
            'reg_type' => $request->reg_type,
            'org_name' => $request->org_name,
            'name' => $request->name,
            'designation' => $request->designation,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'alt_mobile' => $request->alt_mobile,
            'country' => $request->country,
            'state' => $request->state,
            'district' => $request->district,
            'pincode' => $request->pincode,
            'email_otp' => $email_otp,
            'mobile_otp' => $mobile_otp,
            'steps' => 'step1',
        ]);

        // Send OTP via Email using Mailable class
        // Mail::to($user->email)->send(new EmailOTP($email_otp));
        // CommonHelpers::sendOtp($request->mobile, $mobile_otp);

        return response()->json([
            'status' => true,
            'message' => 'Otp Sent On Email And Mobile',
            'user_id' => $user->_id
        ], 201);
    }

    public function resendServicePartnerOtp(Request $request)
    {
        $user = ServicePartner::find($request->id);

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        if ($request->type == 'email') {
            $data['email_otp'] = $email_otp;
            Mail::to($user->email)->send(new EmailOTP($email_otp));
        }
        if ($request->type == 'mobile') {
            $data['mobile_otp'] = $mobile_otp;
            CommonHelpers::sendOtp($user->mobile, $mobile_otp);
        }
        $user = $user->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Otp Has Been Sent!',
        ], 201);
    }

    public function verifyServicePartnerOtp(Request $request)
    {
        $user = ServicePartner::find($request->id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        $url = false;
        if ($request->type == 'email') {
            if ($user->email_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['email_verified_at'] = now()->timestamp;
                $data['email_otp'] = null;
            }
        }
        if ($request->type == 'mobile') {
            if ($user->mobile_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['mobile_verified_at'] = now()->timestamp;
                $data['mobile_otp'] = null;
            }
        }
        $user = $user->update($data);
        $userNew = ServicePartner::find($request->id);
        if (isset($userNew->email_verified_at) && $userNew->mobile_verified_at) {
            $url = true;
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Otp Has Been Verified!',
            'url' => $url,
        ], 201);
    }

    public function getServicePartner($id)
    {
        $user = ServicePartner::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Data Found!',
            'user' => $user,
        ], 201);
    }

    public function servicePartnerDetailsSave(Request $request)
    {
        $user = ServicePartner::find($request->user_id);
        $rules = [];
        $data = [];

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        if ($request->su_type === 'emailMobileChange') {
            $rules['email'] = 'email|unique:service_partners,email';
            $rules['mobile'] = 'unique:service_partners,mobile';

            if (isset($request->email)) {
                $data['email'] = $request->email;
                $data['email_otp'] = $email_otp;
            }
            if (isset($request->mobile)) {
                $data['mobile'] = $request->mobile;
                $data['mobile_otp'] = $mobile_otp;
            }
        }

        if ($request->su_type === 'verification') {
            $rules['dob'] = 'required|date|before:today';
            // Country-specific validation
            if ($user->country === 'India') {
                $rules['office_address'] = 'required|string';
                $rules['office_district'] = 'required|string';
            } else {
                $rules['id_card'] = 'required|file|mimes:pdf,jpeg,png,jpg|max:2048';
            }

            $data['office_address'] = $request->office_address;
            $data['office_district'] = $request->office_district;
            $data['office_state'] = $request->office_state;
            $data['office_pincode'] = $request->office_pincode;
            $data['dob'] = $request->dob;
            $data['steps'] = 'step2';

            if ($request->hasFile('id_card')) {
                $filePath = $request->file('id_card')->store('service_partner_kyc', 'public');
                $data['id_card'] = Storage::url($filePath);
            }
        }

        if ($request->su_type === 'aadhar_verification') {
            if ($request->aadhar_verified == true) {
                $aadhar_details = json_decode($request->aadhar_details, true);
                $data['aadhar_number'] = $request->aadhar_number;
                $data['aadhar_verified'] = now()->format('d-M-Y');
                $data['aadhar_details'] = $aadhar_details;
                $data['dob'] = $aadhar_details['dob'];
            }
        }

        if ($request->su_type === 'gst_verification') {
            if ($request->gst_verified == true) {
                $gst_details = json_decode($request->gst_details, true);
                $data['gst_number'] = $request->gst_number;
                $data['gst_verified'] = now()->format('d-M-Y');
                $data['gst_details'] = $gst_details;
            }
        }

        if ($request->su_type === 'academic') {
            $rules['academic_details'] = 'required';
            $rules['experience_years'] = 'required';
            $rules['experience_months'] = 'required';

            $data['academic_details'] = json_decode($request->academic_details, true);
            $data['experience_years'] = $request->experience_years;
            $data['experience_months'] = $request->experience_months;
            $data['steps'] = 'step3';
        }

        if ($request->su_type === 'branch') {
            $rules['team_size'] = 'required';
            $rules['experience_years'] = 'required';
            $rules['experience_months'] = 'required';
            $rules['branch_address'] = 'required';
            $rules['branch_district'] = 'required';
            $rules['branch_state'] = 'required';
            $rules['branch_pincode'] = 'required';

            $data['branch_address'] = $request->branch_address;
            $data['branch_district'] = $request->branch_district;
            $data['branch_state'] = $request->branch_state;
            $data['branch_pincode'] = $request->branch_pincode;
            $data['experience_years'] = $request->experience_years;
            $data['experience_months'] = $request->experience_months;
            $data['steps'] = 'step3';
        }

        if ($request->su_type === 'skills') {
            $rules['skills'] = 'required';
            $data['skills'] = json_decode($request->skills, true);
            $data['steps'] = 'step4';
        }

        if ($request->su_type === 'profile') {
            $data['business_title'] = $request->business_title;
            $data['business_description'] = $request->business_description;
            $data['website'] = $request->website;
            $data['agreed_terms'] = $request->agreed_terms;
            $data['status'] = 'pending';
            $data['steps'] = 'step5';

            if ($request->hasFile('profile_photo')) {
                $filePath = $request->file('profile_photo')->store('service_partner_kyc', 'public');
                $data['profile_photo'] = Storage::url($filePath);
            }

            if ($request->hasFile('photo')) {
                $filePath = $request->file('photo')->store('service_partner_kyc', 'public');
                $data['photo'] = Storage::url($filePath);
            }
        }

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        $user = $user->update($data);
        if ($user) {

            if ($request->su_type === 'emailMobileChange') {

                if (isset($request->email)) {
                    Mail::to($request->email)->send(new EmailOTP($email_otp));
                }
                if (isset($request->mobile)) {
                    CommonHelpers::sendOtp($request->mobile, $mobile_otp);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Data Saved',
                'data' => ServicePartner::find($request->user_id),
            ], 201);
        }
    }

    // channel partner
    public function registerChannelPartner(Request $request)
    {
        $rules = [
            'country' => 'required|in:India,Other',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:channel_partners,email',
            'mobile' => 'required|unique:channel_partners,mobile',
            'alt_mobile' => 'nullable|digits:10',
            'state' => 'required|string',
            'district' => 'required|string',
            'pincode' => 'required|string|max:10',
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        // Create user
        $user = ChannelPartner::create([
            'name' => $request->name,
            'designation' => $request->designation,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'alt_mobile' => $request->alt_mobile,
            'country' => $request->country,
            'state' => $request->state,
            'district' => $request->district,
            'pincode' => $request->pincode,
            'email_otp' => $email_otp,
            'mobile_otp' => $mobile_otp,
            'steps' => 'step1',
        ]);

        // Send OTP via Email using Mailable class
        // Mail::to($user->email)->send(new EmailOTP($email_otp));
        // CommonHelpers::sendOtp($request->mobile, $mobile_otp);

        return response()->json([
            'status' => true,
            'message' => 'Otp Sent On Email And Mobile',
            'user_id' => $user->_id
        ], 201);
    }

    public function resendChannelPartnerOtp(Request $request)
    {
        $user = ChannelPartner::find($request->id);

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        if ($request->type == 'email') {
            $data['email_otp'] = $email_otp;
            Mail::to($user->email)->send(new EmailOTP($email_otp));
        }
        if ($request->type == 'mobile') {
            $data['mobile_otp'] = $mobile_otp;
            CommonHelpers::sendOtp($user->mobile, $mobile_otp);
        }
        $user = $user->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Otp Has Been Sent!',
        ], 201);
    }

    public function verifyChannelPartnerOtp(Request $request)
    {
        $user = ChannelPartner::find($request->id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        $url = false;
        if ($request->type == 'email') {
            if ($user->email_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['email_verified_at'] = now()->timestamp;
                $data['email_otp'] = null;
            }
        }
        if ($request->type == 'mobile') {
            if ($user->mobile_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['mobile_verified_at'] = now()->timestamp;
                $data['mobile_otp'] = null;
            }
        }
        $user = $user->update($data);
        $userNew = ChannelPartner::find($request->id);
        if (isset($userNew->email_verified_at) && $userNew->mobile_verified_at) {
            $url = true;
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Otp Has Been Verified!',
            'url' => $url,
        ], 201);
    }

    public function getChannelPartner($id)
    {
        $user = ChannelPartner::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Data Found!',
            'user' => $user,
        ], 201);
    }

    public function channelPartnerDetailsSave(Request $request)
    {
        $user = ChannelPartner::find($request->user_id);
        $rules = [];
        $data = [];

        if ($request->su_type === 'verification') {
            $rules['dob'] = 'required|date|before:today';
            // Country-specific validation
            if ($user->country === 'India') {
                $rules['office_address'] = 'required|string';
                $rules['office_district'] = 'required|string';
            } else {
                $rules['id_card'] = 'required|file|mimes:pdf,jpeg,png,jpg|max:2048';
            }

            $data['office_address'] = $request->office_address;
            $data['office_district'] = $request->office_district;
            $data['office_state'] = $request->office_state;
            $data['office_pincode'] = $request->office_pincode;
            $data['dob'] = $request->dob;
            $data['steps'] = 'step2';

            if ($request->hasFile('id_card')) {
                $filePath = $request->file('id_card')->store('service_partner_kyc', 'public');
                $data['id_card'] = Storage::url($filePath);
            }
        }

        if ($request->su_type === 'aadhar_verification') {
            if ($request->aadhar_verified == true) {
                $aadhar_details = json_decode($request->aadhar_details, true);
                $data['aadhar_number'] = $request->aadhar_number;
                $data['aadhar_verified'] = now()->format('d-M-Y');
                $data['aadhar_details'] = $aadhar_details;
                $data['dob'] = $aadhar_details['dob'];
            }
        }

        if ($request->su_type === 'academic') {
            $rules['academic_details'] = 'required';
            $rules['experience_years'] = 'required';
            $rules['experience_months'] = 'required';

            $data['academic_details'] = json_decode($request->academic_details, true);
            $data['experience_years'] = $request->experience_years;
            $data['experience_months'] = $request->experience_months;
            $data['steps'] = 'step3';
        }

        if ($request->su_type === 'branch') {
            $rules['team_size'] = 'required';
            $rules['experience_years'] = 'required';
            $rules['experience_months'] = 'required';
            $rules['branch_address'] = 'required';
            $rules['branch_district'] = 'required';
            $rules['branch_state'] = 'required';
            $rules['branch_pincode'] = 'required';

            $data['branch_address'] = $request->branch_address;
            $data['branch_district'] = $request->branch_district;
            $data['branch_state'] = $request->branch_state;
            $data['branch_pincode'] = $request->branch_pincode;
            $data['experience_years'] = $request->experience_years;
            $data['experience_months'] = $request->experience_months;
            $data['steps'] = 'step3';
        }

        if ($request->su_type === 'skills') {
            $rules['skills'] = 'required';
            $data['skills'] = json_decode($request->skills, true);
            $data['steps'] = 'step4';
        }

        if ($request->su_type === 'profile') {
            $data['business_title'] = $request->business_title;
            $data['business_description'] = $request->business_description;
            $data['website'] = $request->website;
            $data['agreed_terms'] = $request->agreed_terms;
            $data['status'] = 'pending';
            $data['steps'] = 'step5';

            if ($request->hasFile('profile_photo')) {
                $filePath = $request->file('profile_photo')->store('channel_partner_kyc', 'public');
                $data['profile_photo'] = Storage::url($filePath);
            }

            if ($request->hasFile('photo')) {
                $filePath = $request->file('photo')->store('channel_partner_kyc', 'public');
                $data['photo'] = Storage::url($filePath);
            }
        }

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        $user = $user->update($data);
        if ($user) {
            return response()->json([
                'status' => true,
                'message' => 'Data Saved',
                'data' => ChannelPartner::find($request->user_id),
            ], 201);
        }
    }
}
