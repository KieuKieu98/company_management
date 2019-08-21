<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class OT extends Model
{
    public $table = 'ots';
    protected $fillable = [
        'date', 'hour', 'user_id', 'team_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
