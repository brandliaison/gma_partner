<?php

namespace App\Models\OP;

use App\Models\IT\ItStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class ServiceCategoryRevision extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_category_id',
        'old_data',
        'new_data',
        'revised_by',
        'from_platform',
        'status',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];

    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function getRevisedUserAttribute()
    {
        if ($this->from_platform === "operations") {
            return OpStaff::find($this->revised_by);
        }

        if ($this->from_platform === "partner") {
            return ItStaff::find($this->revised_by);
        }

        return null; // Return null if no matching condition
    }

    protected $appends = ['revised_user'];
}
