<?php

namespace App\Models\IT;

// use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class WebsiteSetting extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'key',
        'value',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
