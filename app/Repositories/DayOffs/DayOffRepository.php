<?php

namespace App\Repositories\DayOffs;


use App\DayOff;
use App\Repositories\EloquentRepository;
use App\User;

class DayOffRepository extends EloquentRepository implements DayOffInterface
{
    // model property on class instances
    protected $model;
    // Constructor to bind model to repo
    public function __construct(DayOff $model)
    {
        $this->model = $model;
    }
    // Get all instances of model (waiting)
    public function all()
    {
        return  $this->model
            ->select([
                'day_offs.id',
                'day_offs.reason',
                'day_offs.from_date',
                'day_offs.hour',
                'day_offs.status',
                'day_offs.user_id',
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.avatar',
                'users.role'
            ])
            ->join('users', 'day_offs.user_id', '=', 'users.id')
            ->where([
                'status' => 'Waiting',
                'users.deleted_at' => null
            ])
            ->orderBy('day_offs.created_at', 'desc')->paginate(5);
    }
    // show the all record follow team 
    public function userAll($id)
    {
        return  $this->model
            ->select([
                'day_offs.id',
                'day_offs.reason',
                'day_offs.from_date',
                'day_offs.hour',
                'day_offs.status',
                'day_offs.user_id',
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.avatar',
                'users.role'
            ])
            ->join('users', 'day_offs.user_id', '=', 'users.id')
            ->where([
                'status' => 'Waiting',
                'users.deleted_at' => null,
                'day_offs.user_id' => $id
            ])
            ->orderBy('day_offs.created_at', 'desc')->get();
    }
    // show the record with the given id
    public function show($id)
    {
        return  $this->model
            ->select([
                'day_offs.id',
                'day_offs.reason',
                'day_offs.from_date',
                'day_offs.hour',
                'day_offs.status',
                'day_offs.user_id',
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.avatar',
                'users.role'
            ])
            ->join('users', 'day_offs.user_id', '=', 'users.id')
            ->where([
                'day_offs.id'       => $id,
                'users.deleted_at'  => null,
            ])
            ->orderBy('day_offs.created_at', 'desc')->first();
    }
    // create a new record in the database
    public function store(array $data)
    {
        return $this->model->create($data);
    }
    // update record in the database
    public function update($id, array $data)
    {
        $record = $this->model->find($id);
        return $record->update($data);
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
    // Show all data approved for each user
    public function showAllAprroved($id)
    {
        return $this->model
            ->select([
                'day_offs.id',
                'day_offs.reason',
                'day_offs.from_date',
                'day_offs.hour',
                'day_offs.status',
                'day_offs.user_id',
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.avatar',
                'users.role'
            ])
            ->join('users', 'day_offs.user_id', '=', 'users.id')
            ->where([
                'day_offs.user_id'  =>  $id,
                ['status', '<>', 'Waiting'],
                'users.deleted_at'  =>  null
            ])
            ->orderBy('day_offs.created_at', 'desc')->get();
    }
    public function showAllStatus()
    {
        return  $this->model
            ->select([
                'day_offs.id',
                'day_offs.reason',
                'day_offs.from_date',
                'day_offs.hour',
                'day_offs.status',
                'day_offs.user_id',
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.avatar',
                'users.role'
            ])
            ->join('users', 'day_offs.user_id', '=', 'users.id')
            ->where([
                ['status', '<>', 'Waiting'],
                'users.deleted_at' => null
            ])
            ->orderBy('day_offs.created_at', 'desc')->paginate(5);
    }
    public function allWaiting(){
        return $this->model->where(['status' => 'Waiting'])->count();
    }
    public function allAccepted(){
        return $this->model->where(['status' => 'Accepted'])->count();
    }
    public function allDeclined(){
        return $this->model->where(['status' => 'Declined'])->count();
    }
}
