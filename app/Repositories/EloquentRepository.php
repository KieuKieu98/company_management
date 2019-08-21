<?php 
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class EloquentRepository implements InterfaceRepository
{
    // model property on class instances
    protected $model;
    // Constructor to bind model to repo
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    // Get all instances of model
    public function all()
    {
        return $this->model->all();
    }
    // create a new record in the database
    public function store(array $data)
    {
        return $this->model->create($data);
    }
    // update record in the database
    public function update($id, array $data)
    {
        $record = $this->find($id);
        return $record->update($data);
    }
    // remove record from the database
    public function destroy($id)
    {
        return $this->model->destroy($id);
    }
    // show the record with the given id
    public function show($id)
    {
        return $this->model-findOrFail($id);
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
}