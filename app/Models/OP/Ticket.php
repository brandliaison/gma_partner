<?php

namespace App\Models\OP;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subject',
        'details',
        'ticket_category_id',
        'created_by',
        'from_platform',
        'rating',
        'feedback',
        'rated_at',
        'status',
    ];

    protected $casts = [
        'rated_at' => 'datetime',
    ];

    // Relationship with TicketCategory
    public function category()
    {
        return $this->belongsTo(TicketsCategory::class, 'ticket_category_id', '_id')->select('_id', 'name');
    }

    // Relationship with User
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', '_id')->select('_id', 'name');
    }

    public function actions()
    {
        return $this->hasMany(TicketAction::class, 'ticket_id', '_id');
    }

    public function latestAction()
    {
        return $this->hasOne(TicketAction::class, 'ticket_id', '_id')->latest();
    }

    public function replies()
    {
        return $this->hasMany(TicketReply::class, 'ticket_id', '_id')->latest();
    }
}
