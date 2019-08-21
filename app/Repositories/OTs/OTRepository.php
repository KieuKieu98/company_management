<?php

namespace App\Repositories\OTs;


use App\OT;
use App\Repositories\EloquentRepository;
use JWTAuth;
use App\User;
use App\Team;

class OTRepository extends EloquentRepository implements OTInterface
{
    // model property on class instances
    protected $model;
    // Constructor to bind model to repo
    public function __construct(OT $model)
    {
        $this->model = $model;
    }
    // Get all instances of model
    public function allDataSort($key, $sortDate, $sortHour)
    {
        if (empty($key) && empty($sortDate) && empty($sortHour)) {
            return  $this->model
                ->select([
                    'ots.id',
                    'ots.date',
                    'ots.hour',
                    'ots.user_id',
                    'ots.team_id',
                    'users.first_name',
                    'users.last_name',
                    'users.avatar',
                    'users.email',
                    'teams.name'
                ])
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')
                ->where('users.deleted_at', null)
                ->orderBy('ots.created_at', 'desc')->paginate(5);
        }
        if (!empty($key) && empty($sortDate) && empty($sortHour)) {
            return  $this->model->select([
                'ots.id',
                'ots.date',
                'ots.hour',
                'ots.user_id',
                'ots.team_id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
                'users.email',
                'teams.name'
            ])
                ->where(
                    [
                        ['users.first_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['users.last_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['teams.name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')->paginate(5);
        }
        // Sort with search key
        if (!empty($key) && $sortDate == "sortUpDate" && empty($sortHour)) {
            return  $this->model
            ->select([
                'ots.id',
                'ots.date',
                'ots.hour',
                'ots.user_id',
                'ots.team_id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
                'users.email',
                'teams.name'
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->where(
                [
                    ['users.first_name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )
            ->orWhere(
                [
                    ['users.last_name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )
            ->orWhere(
                [
                    ['teams.name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )->orderBy('ots.date', 'ASC')->paginate(5);
        }
        if (!empty($key) && $sortDate == "sortDownDate" && empty($sortHour)) {
            return  $this->model
            ->select([
                'ots.id',
                'ots.date',
                'ots.hour',
                'ots.user_id',
                'ots.team_id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
                'users.email',
                'teams.name'
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->where(
                [
                    ['users.first_name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )
            ->orWhere(
                [
                    ['users.last_name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )
            ->orWhere(
                [
                    ['teams.name', 'like', '%' . $key . '%'],
                    ['users.deleted_at', '=', null]
                ]
            )->orderBy('ots.date', 'DESC')->paginate(5);
        }
        if (!empty($key) && $sortHour == "sortUpHour"  && empty($sortDate)){
            return  $this->model
                ->select([
                    'ots.id',
                    'ots.date',
                    'ots.hour',
                    'ots.user_id',
                    'ots.team_id',
                    'users.first_name',
                    'users.last_name',
                    'users.avatar',
                    'users.email',
                    'teams.name'
                ])
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')
                ->where(
                    [
                        ['users.first_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['users.last_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['teams.name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orderBy('ots.hour', 'ASC')->paginate(5);
        }
        if (!empty($key) && $sortHour == "sortDownHour" && empty($sortDate)) {
            return  $this->model
                ->select([
                    'ots.id',
                    'ots.date',
                    'ots.hour',
                    'ots.user_id',
                    'ots.team_id',
                    'users.first_name',
                    'users.last_name',
                    'users.avatar',
                    'users.email',
                    'teams.name'
                ])
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')
                ->where(
                    [
                        ['users.first_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['users.last_name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orWhere(
                    [
                        ['teams.name', 'like', '%' . $key . '%'],
                        ['users.deleted_at', '=', null]
                    ]
                )
                ->orderBy('ots.hour', 'DESC')->paginate(5);
        }
        // Sort without search key
        if ($sortDate == "sortUpDate" && empty($sortHour)) {
            return  $this->model
            ->select([
                'ots.id',
                'ots.date',
                'ots.hour',
                'ots.user_id',
                'ots.team_id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
                'users.email',
                'teams.name'
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->where('users.deleted_at', null)
            ->orderBy('ots.date', 'ASC')->paginate(5);
        }
        if ($sortDate == "sortDownDate" && empty($sortHour)) {
            return  $this->model
            ->select([
                'ots.id',
                'ots.date',
                'ots.hour',
                'ots.user_id',
                'ots.team_id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
                'users.email',
                'teams.name'
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->where('users.deleted_at', null)
            ->orderBy('ots.date', 'DESC')->paginate(5);
        }
        if ($sortHour == "sortUpHour" && empty($sortDate)) {
            return  $this->model
                ->select([
                    'ots.id',
                    'ots.date',
                    'ots.hour',
                    'ots.user_id',
                    'ots.team_id',
                    'users.first_name',
                    'users.last_name',
                    'users.avatar',
                    'users.email',
                    'teams.name'
                ])
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')
                ->where('users.deleted_at', null)
                ->orderBy('ots.hour', 'ASC')->paginate(5);
        }
        if ($sortHour == "sortDownHour" && empty($sortDate)) {
            return  $this->model
                ->select([
                    'ots.id',
                    'ots.date',
                    'ots.hour',
                    'ots.user_id',
                    'ots.team_id',
                    'users.first_name',
                    'users.last_name',
                    'users.avatar',
                    'users.email',
                    'teams.name'
                ])
                ->join('users', 'ots.user_id', '=', 'users.id')
                ->join('teams', 'ots.team_id', '=', 'teams.id')
                ->where('users.deleted_at', null)
                ->orderBy('ots.hour', 'DESC')->paginate(5);
        }
    }
    // show the all record follow team
    public function showTeam($id)
    {
        return $this->model->select([
            'ots.id',
            'ots.date',
            'ots.hour',
            'ots.user_id',
            'ots.team_id',
            'users.first_name',
            'users.last_name',
            'users.avatar',
            'users.email',
            'teams.name'
        ])
            ->where([
                'users.deleted_at'  => null,
                'ots.team_id'       =>   $id
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->orderBy('ots.created_at', 'desc')->paginate(5);
    }
    // show one record follow team
    public function showOneOT($id)
    {
        return  $this->model->select([
            'ots.id',
            'ots.date',
            'ots.hour',
            'ots.user_id',
            'ots.team_id',
            'users.first_name',
            'users.last_name',
            'users.avatar',
            'users.email',
            'teams.name'
        ])
            ->where([
                'users.deleted_at'  => null,
                'ots.id'            => $id
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')
            ->orderBy('ots.created_at', 'desc')->paginate(5);
    }
    // show the record with the given id
    public function show($id)
    {
        return  $this->model->select([
            'ots.id',
            'ots.date',
            'ots.hour',
            'ots.user_id',
            'ots.team_id',
            'users.first_name',
            'users.last_name',
            'users.avatar',
            'users.email',
            'teams.name'
        ])
            ->where([
                'users.deleted_at'  => null,
                'ots.user_id'       => $id
            ])
            ->join('users', 'ots.user_id', '=', 'users.id')
            ->join('teams', 'ots.team_id', '=', 'teams.id')->paginate(5);
    }
    // create a new record in the database
    public function store(array $data)
    {
        return  $this->model->create($data);
    }
    // update record in the database
    public function update($id, array $data)
    {
        $record =   $this->model->find($id);
        return  $record->update($data);
    }
    // remove record from the database
    public function destroy($id)
    {
        return  $this->model->destroy($id);
    }
    // Get the associated model
    public function getModel()
    {
        return  $this->model;
    }
    // Set the associated model
    public function setModel($model)
    {
        $this->model =  $model;
        return $this;
    }
    // Eager load database relationships
    public function with($relations)
    {
        return  $this->model->with($relations);
    }
}
