<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Mail\ServicePartnerApprovalMail;
use App\Models\ServicePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ServicePartnerController extends Controller
{
    public function index()
    {
        $data = ServicePartner::get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function show($id)
    {
        $data = ServicePartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }
        $data->makeVisible(['aadhar_details', 'aadhar_number', 'gst_details', 'gst_number']);
        $data->skills = $data->getSkillsWithServices();

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function approve($id)
    {
        $data = ServicePartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        if ($data->status == 'Sent For Approval') {
            $status = 'Approved';
        } else {
            $status = 'Sent For Approval';
        }

        $update = $data->update(['status' => $status]);
        if ($update) {

            if ($status == 'Approved') {
                $data->update(['password' => Hash::make($data->mobile)]);
            }

            // Send Email Notification
            Mail::to($data->email)->send(new ServicePartnerApprovalMail($data->toArray()));
            return response()->json(['data' => ServicePartner::find($id), 'message' => 'Data Updated'], 200);
        } else {
            return response()->json(['data' => [], 'message' => 'Something went wrong'], 401);
        }
    }

    public function reject($id)
    {
        $data = ServicePartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        $status = 'Rejected';

        $update = $data->update(['status' => $status]);
        if ($update) {

            Mail::to($data->email)->send(new ServicePartnerApprovalMail($data->toArray()));
            return response()->json(['data' => ServicePartner::find($id), 'message' => 'Data Updated'], 200);
        } else {
            return response()->json(['data' => [], 'message' => 'Something went wrong'], 401);
        }
    }
}
