<?php

namespace App\Models\OP;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'service_category_id',
        'image_url',
        'image_alt',
        'description',
        'compliance_header',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'created_by',
        'approval_status',
        'status',
    ];

    protected $dates = ['first_approved_date', 'final_approved_date'];

    // Relationships
    public function category()
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id')->select('_id', 'name', 'slug', 'description');
    }

    public function revisedBy()
    {
        // return $this->belongsTo(User::class, 'revised_by');
    }

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'Service');
    }

    public static function revisionRejected($id)
    {
        return self::where('_id', $id)->update([
            'approval_status' => 'rejected',
            'first_approver' => Auth::id(),
            'first_approved_date' => now()->toDateTimeString()
        ]);
    }

    public static function revisionPartiallyApproved($id)
    {
        return self::where('_id', $id);
    }

    public static function revisionApproved($id)
    {
        return self::where('_id', $id)->update(['approval_status' => 'approved', 'status' => 'active', 'final_approver' => Auth::id(), 'final_approved_date' => Carbon::now()->toDateTimeString()]);
    }
    public function createdByUser(){
        return $this->belongsTo(OpStaff::class, 'created_by', '_id');
    }
}
