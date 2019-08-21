<?php

namespace App\Repositories\Users;


use App\User;
use App\Repositories\EloquentRepository;

class UserRepository extends EloquentRepository implements UserInterface
{
    // model property on class instances
    protected $model;
    // Constructor to bind model to repo
    public function __construct(User $model)
    {
        $this->model = $model;
    }
    // Get all instances of model
    public function all()
    {
        $conditions = [
            ['deleted_at', '=', null],
            ['id', '<>', 1],
        ];
        return $this->model->select(
            'id',
            'first_name',
            'last_name',
            'email',
            'avatar',
            'phone',
            'address',
            'gender',
            'date_of_birth',
            'role',
            'team_id'
        )->where($conditions)->orderBy('created_at', 'desc')->paginate(4);
    }
    // create a new record in the database
    public function store(array $data)
    {
        return $this->model->create($data);
    }
    // update record in the database
    public function update($id, array $data)
    {
        $record = $this->model->where('deleted_at', null)->find($id);
        return $record->update($data);
    }
    // remove record from the database
    public function destroy($id)
    {
        return $this->model->where('deleted_at', null)->destroy($id);
    }
    // show the record with the given id
    public function show($id)
    {
        return $this->model->find($id);
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
}
