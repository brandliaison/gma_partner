<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use MongoDB\Laravel\Eloquent\Model;

class ContactEnquries extends Model
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
        'file_path',
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
