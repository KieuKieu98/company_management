<?php 

namespace App\Repositories\Teams;

interface TeamInterface
{
    public function all();
    
    public function store(array $data);

    public function update($id, array $data);

    public function destroy($id);

    public function show($id);

    public function showMemberFlTeam($id);

    public function searchMember($id ,$data);

    public function addMember($id, $data);

    public function deleteMember($id);

    public function searchMemberFlTeam($id, $data);
}