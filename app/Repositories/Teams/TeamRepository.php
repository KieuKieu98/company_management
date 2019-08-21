<?php

namespace App\Repositories\Teams;


use App\Team;
use App\User;
use App\Repositories\EloquentRepository;

class TeamRepository extends EloquentRepository implements TeamInterface
{
    // model property on class instances
    protected $model;
    // Constructor to bind model to repo
    public function __construct(Team $model)
    {
        $this->model = $model;
    }
    // Get all instances of model
    public function all()
    {
        return $this->model->orderBy('created_at', 'desc')->get();
    }
    // create a new record in the database
    public function store(array $data)
    {
        return $this->model->create($data);
    }
    // remove record from the database
    public function destroy($id)
    {
        return $this->model->destroy($id);
    }
    // Get the associated model
    public function getModel()
    {
        return $this->model;
    }
    // Set the associated model
    public function setModel($model)
    {
        $this->model = $model;
        return $this;
    }
    // Eager load database relationships
    public function with($relations)
    {
        return $this->model->with($relations);
    }
    // Show member follow team
    public function showMemberFlTeam($id)
    {
        return User::where(['deleted_at' => null, 'team_id' => $id])->orderBy('id', 'DESC')->get();
    }
    public function searchMember($id, $data)
    {
        $result =   User::where(
            [
                ['first_name', 'like', '%' . $data . '%'],
                ['team_id', '<>', $id],
                ['role', '<>', 'Super Admin'],
                ['deleted_at', null]
            ]
        )
        ->orWhere(
            [
                ['last_name', 'like', '%' . $data . '%'],
                ['team_id', '<>', $id],
                ['role', '<>', 'Super Admin'],
                ['deleted_at', null]
            ]
        )
        ->orWhere(
            [
                ['email',    'like', '%' . $data . '%'],
                ['team_id', '<>', $id],
                ['role', '<>', 'Super Admin'],
                ['deleted_at', null]
            ]
        )->get();
        return $result;
    }
    public function addMember($id, $data)
    {
        $user   =   User::where('deleted_at', null)->find($data);
        $user->team_id = (int) $id;
        $user->save();
        return $user;
    }
    public function deleteMember($id)
    {
        $user   =   User::where('deleted_at', null)->find($id);
        $user->team_id  =   0;
        $user->save();
        return $user;
    }
    public function searchMemberFlTeam($id, $data)
    {
        $result =   User::where(
            [
                ['first_name', 'like', '%' . $data . '%'],
                ['team_id', $id],
                ['role', '<>', 'Super Admin'],
                ['role', '<>', 'Manager'],
                ['deleted_at', null]
            ]
        )
        ->orWhere(
            [
                ['last_name', 'like', '%' . $data . '%'],
                ['team_id', $id],
                ['role', '<>', 'Super Admin'],
                ['role', '<>', 'Manager'],
                ['deleted_at', null]
            ]
        )
        ->orWhere(
            [
                ['team_id',    'like', '%' . $data . '%'],
                ['team_id', $id],
                ['role', '<>', 'Super Admin'],
                ['role', '<>', 'Manager'],
                ['deleted_at', null]
            ]
        )->get();
        return $result;
    }
    public function getId()
    {
        return $this->model->get('id');
    }
}
