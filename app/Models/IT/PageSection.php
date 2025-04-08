<?php

namespace App\Models\IT;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class PageSection extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['page_id', 'slug', 'image', 'content', 'order', 'status'];

    public function page()
    {
        return $this->belongsTo(PageManagement::class);
    }
}
