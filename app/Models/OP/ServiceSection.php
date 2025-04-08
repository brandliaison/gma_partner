<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as EloquentModel;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class ServiceSection extends EloquentModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_id',
        'name',
        'slug',
        'content',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'created_by',
        'approval_status',
        'status',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id')->select('_id', 'name');
    }

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'ServiceSection');
    }
    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
}
