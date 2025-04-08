<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class JobApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'job_id',
        'name',
        'email',
        'mobile',
        'city',
        'cv',
    ];

    function job(){
        return $this->belongsTo(Career::class, 'job_id', '_id');
    }
}
