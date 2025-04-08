<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Mail\ServicePartnerApprovalMail;
use App\Models\ChannelPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ChannelPartnerController extends Controller
{
    public function index()
    {
        $data = ChannelPartner::get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function show($id)
    {
        $data = ChannelPartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }
        $data->skills = $data->getSkillsWithServices();

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function approve($id)
    {
        $data = ChannelPartner::find($id);

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
            return response()->json(['data' => ChannelPartner::find($id), 'message' => 'Data Updated'], 200);
        } else {
            return response()->json(['data' => [], 'message' => 'Something went wrong'], 401);
        }
    }

    public function reject($id)
    {
        $data = ChannelPartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        $status = 'Rejected';

        $update = $data->update(['status' => $status]);
        if ($update) {

            Mail::to($data->email)->send(new ServicePartnerApprovalMail($data->toArray()));
            return response()->json(['data' => ChannelPartner::find($id), 'message' => 'Data Updated'], 200);
        } else {
            return response()->json(['data' => [], 'message' => 'Something went wrong'], 401);
        }
    }
}
