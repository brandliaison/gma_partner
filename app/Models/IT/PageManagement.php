<?php

namespace App\Models\IT;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class PageManagement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'bg_image', 'slug', 'status'];

    public function sections()
    {
        return $this->hasMany(PageSection::class, 'page_id');
    }
}
