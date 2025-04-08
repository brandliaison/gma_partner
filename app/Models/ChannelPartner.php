<?php

namespace App\Models;

use App\Models\OP\Service;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class ChannelPartner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'country',
        'name',
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
        'office_address',
        'office_district',
        'office_state',
        'office_pincode',
        'dob',
        'id_card',
        'academic_details',
        'experience_years',
        'experience_months',
        'skills',
        'business_title',
        'business_description',
        'profile_photo',
        'photo',
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
}
