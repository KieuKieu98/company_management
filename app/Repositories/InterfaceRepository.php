<?php
namespace App\Repositories;

interface InterfaceRepository
{
    public function all();
    
    public function store(array $data);

    public function update($id, array $data);

    public function destroy($id);

    public function show($id);
}