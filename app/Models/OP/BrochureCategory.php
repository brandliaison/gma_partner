<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class BrochureCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'posted_by', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(OpStaff::class, 'posted_by');
    }
}
