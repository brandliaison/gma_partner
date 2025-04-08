<?php

namespace App\Models\OP;

use App\Models\IT\ItStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class ServiceCategoryReview extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_category_id',
        'service_category_revision_id',
        'reviewed_by',
        'review_comment',
        'review_status',
        'from_platform',
    ];

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function getReviewerAttribute()
    {
        if ($this->from_platform === "operations") {
            return OpStaff::find($this->reviewed_by);
        }

        if ($this->from_platform === "it") {
            return ItStaff::find($this->reviewed_by);
        }

        return null; // Return null if no matching condition
    }

    protected $appends = ['reviewer'];
}
