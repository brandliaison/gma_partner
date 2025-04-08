<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class EntityReview extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'entity_type',
        'entity_revision_id',
        'reviewed_by',
        'review_comment',
        'review_status',
        'from_platform',
    ];

}
