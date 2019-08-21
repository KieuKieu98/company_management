<?php 

namespace App\Repositories\DayOffs;

interface DayOffInterface
{
    public function all();
    
    public function store(array $data);

    public function userAll($id);

    public function show($id);

    public function update($id, array $data);

    public function destroy($id);
}