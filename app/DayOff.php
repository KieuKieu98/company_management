<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class DayOff extends Model
{
    public $table = 'day_offs';
    protected $fillable = [
        'reason', 'from_date', 'hour', 'status', 'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}