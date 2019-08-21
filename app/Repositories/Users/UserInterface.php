<?php 

namespace App\Repositories\Users;

interface UserInterface
{
    public function all();
    
    public function store(array $data);

    public function update($id, array $data);

    public function destroy($id);

    public function show($id);
}