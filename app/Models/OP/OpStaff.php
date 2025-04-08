<?php

namespace App\Models\OP;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class OpStaff extends Model
{
    use HasFactory, Authenticatable, HasApiTokens, HasRoles, SoftDeletes;

    protected $collection = 'op_staffs';

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'role',
        'op_designation_id', 'profile_image', 'parent_staff_id', 'parent_staff_type', 'status'
    ];
    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
    ];
}
