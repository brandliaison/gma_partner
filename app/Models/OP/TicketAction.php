<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class TicketAction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ticket_id',
        'performed_by',
        'assigned_to',
        'action_type',
        'action_details',
    ];

    public function attachments()
    {
        return $this->belongsTo(TicketAttachments::class, 'ticket_action_id', '_id');
    }
}
