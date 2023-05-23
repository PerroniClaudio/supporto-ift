<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{

    use HasFactory;
    protected $fillable = ['request_type', 'description', 'user_id', 'time'];

    public function request_type() {
        return $this->hasOne(RequestType::class,'id',  'request_type');
    }
}
