<?php

namespace App\Models;

use App\Models\OP\Service;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class ServicePartner extends Model
{
    use HasFactory, SoftDeletes, Authenticatable, HasApiTokens, HasRoles;

    protected $fillable = [
        'reg_type',
        'country',
        'org_name',
        'name',
        'designation',
        'email',
        'email_otp',
        'email_verified_at',
        'mobile',
        'mobile_otp',
        'mobile_verified_at',
        'alt_mobile',
        'password',
        'country',
        'state',
        'district',
        'pincode',
        'aadhar_number',
        'aadhar_verified',
        'aadhar_details',
        'gst_number',
        'gst_verified',
        'gst_details',
        'office_address',
        'office_district',
        'office_state',
        'office_pincode',
        'dob',
        'id_card',
        'academic_details',
        'experience_years',
        'experience_months',
        'team_size',
        'branch_address',
        'branch_district',
        'branch_state',
        'branch_pincode',
        'skills',
        'business_title',
        'business_description',
        'profile_photo',
        'photo',
        'website',
        'agreed_terms',
        'status',
        'steps',
    ];

    public function getSkillsWithServices()
    {
        $skills = $this->skills ?? [];

        return collect($skills)->map(function ($skill) {
            $service = Service::where('_id', $skill['service'])->select('_id', 'name')->first();
            $skill['service_details'] = $service;
            return $skill;
        });
    }
    protected $hidden = [
        'aadhar_details',
        'aadhar_number',
        'gst_details',
        'gst_number',
        'password',
        'created_at',
        'updated_at',
    ];
}
