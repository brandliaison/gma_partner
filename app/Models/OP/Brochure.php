<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Brochure extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'file_path',
        'posted_by',
        'from_platform',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(OpStaff::class, 'posted_by');
    }

    public function category()
    {
        return $this->belongsTo(BrochureCategory::class, 'category_id');
    }
}
