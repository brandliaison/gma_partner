<?php

namespace App\Models\IT;

// use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class ItStaff extends Model implements AuthenticatableContract
{
    use HasFactory, Authenticatable, HasApiTokens, HasRoles, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'role',
        'it_designation_id', 'file_path', 'profile_image', 'parent_staff_id', 'status'
    ];
    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
    ];

}
