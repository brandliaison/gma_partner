<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Faq extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'faq_category_id',
        'question',
        'answer',
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

    // Relationships
    public function category()
    {
        return $this->belongsTo(FaqCategory::class, 'faq_category_id')->select('_id', 'name', 'slug', 'description');
    }

    public function revisedBy()
    {
        // return $this->belongsTo(User::class, 'revised_by');
    }

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'Faq');
    }
    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
}
