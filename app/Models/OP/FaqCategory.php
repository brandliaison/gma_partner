<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class FaqCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'description', 'posted_by', 'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'parent_category',
        'created_by',
        'approval_status', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(OpStaff::class, 'posted_by');
    }
    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'FaqCategory');
    }
    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
    public function parentCat(){
        return $this->belongsTo(FaqCategory::class, 'parent_category', '_id')->select('_id', 'name');
    }
}
