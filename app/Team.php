<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Team extends Model
{
    protected $fillable = [
        'name'
    ];
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
