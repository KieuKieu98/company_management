<?php 

namespace App\Repositories\OTs;

interface OTInterface
{
    public function all();
    
    public function store(array $data);

    public function showTeam($id);

    public function show($id);

    public function update($id, array $data);

    public function destroy($id);

    public function allDataSort($key, $sortDate, $sortHour);

}