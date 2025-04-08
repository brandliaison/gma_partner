<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'title',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'parent_category',
        'approval_status',
        'created_by',
        'status',
    ];

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'BlogCategory');
    }
    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
    public function parentCat(){
        return $this->belongsTo(BlogCategory::class, 'parent_category', '_id')->select('_id', 'name');
    }

}
