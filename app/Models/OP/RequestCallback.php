<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class RequestCallback extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'country_code',
        'phone',
        'country',
        'organization',
        'message',
        'time',
        'replied',
        'reply_via',
        'reply_by',
        'status',
    ];

    // Relationship with User (Staff who replied)
    public function repliedBy()
    {
        return $this->belongsTo(OpStaff::class, 'reply_by');
    }
}
