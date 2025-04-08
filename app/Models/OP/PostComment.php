<?php

namespace App\Models\OP;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class PostComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'post_type',
        'post_id',
        'comment',
        'user_id',
        'approved_by',
        'from_platform',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', '_id');
    }

    public function approver()
    {
        return $this->belongsTo(OpStaff::class, 'approved_by', '_id');
    }
}
