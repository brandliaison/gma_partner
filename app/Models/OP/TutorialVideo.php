<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class TutorialVideo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'tutorial_video_category_id',
        'video_url',
        'thumbnail_url',
        'image_alt',
        'description',
        'content',
        'is_downloadable',
        'open_comment',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'approval_status',
        'created_by',
        'status',
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(TutorialVideoCategory::class, 'tutorial_video_category_id')->select('_id', 'name', 'slug', 'description');
    }

    public function revisedBy()
    {
        // return $this->belongsTo(User::class, 'revised_by');
    }

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'TutorialVideoCategory');
    }

    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
}
