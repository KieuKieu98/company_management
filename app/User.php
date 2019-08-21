<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Team;
use App\OT;
use App\DayOff;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'avatar', 'phone', 'address', 'gender', 'date_of_birth', 'token_reset', 'role', 'is_deleted', 'team_id', 'expired_reset'
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function getFullnameAttribute()
    {
        return $this->first_name . $this->last_name;
    }
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
    public function ots()
    {
        return $this->hasMany(OT::class);
    }
    public function day_offs()
    {
        return $this->hasMany(DayOff::class);
    }
}
