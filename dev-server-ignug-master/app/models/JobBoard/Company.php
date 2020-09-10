<?php

namespace App\Models\JobBoard;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use App\User;
use App\Models\State;

class Company extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $connection = 'pgsql-authentication';

    protected $fillable = [
        'user_id',
        'identity',
        'nature',
        'email',
        'trade_name',
        'comercial_activity',
        'phone',
        'cell_phone',
        'web_page',
        'address',
        'state',
    ];

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function type()
    {
        return $this->belongsTo(Catalogue::class);
    }

    public function professionals()
    {
        return $this->belongsToMany(Professional::class)->withTimestamps();
    }
}
