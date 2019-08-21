<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Teams\TeamRepository;
use Validator;
use App\Team;
use App\User;
use JWTAuth;

class TeamController extends Controller
{
    protected $teams;
    public function __construct(TeamRepository $teams)
    {
        $this->teams =  $teams;
    }
    public function index()
    {
        return $this->teams->all();
    }
    public function store(Request $request)
    {
        $validator      =   Validator::make($request->all(), [
            'name'      =>  ['bail', 'required', 'min:1', 'max:60', 'unique:teams'],
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json($validator->errors(), 404);
        } else {
            $teamArray  = [
                'name'  =>  $request->name,
            ];
            $result = $this->teams->store($teamArray);
            // Save manager in team
            $JWTRole    =   JWTAuth::user()->role;
            if ($JWTRole == 'Manager') {
                $JWTId      =   JWTAuth::user()->id;
                $team       =   Team::where('name', $teamArray['name'])->first();
                $teamId     =   $team->id;
                $this->teams->addMember($teamId, $JWTId);
            }
            if (!$result) {
                return response()->json([
                    'message'   =>  'Creating a team fail!',
                    'status'    =>  false
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Creating a team successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ], 200);
            }
        }
    }
    public function destroy($id)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()
                ->json([
                    'message'   =>  'The team not found!',
                    'status'    =>  false
                ], 404);
        }
        $result = $this->teams->destroy($id);
        if ($result) {
            return response()
                ->json([
                    'message'   =>  'You delete successfully!',
                    'status'    =>  true
                ], 200);
        }
    }
    public function showMemberFlTeam($id)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()
                ->json([
                    'message'   =>  'The team not found!',
                    'status'    =>  false
                ], 404);
        } else {
            if (empty($team)) {
                return response()
                    ->json([
                        'message'   =>  'The team not found!',
                        'status'    =>  false
                    ], 404);
            } else {
                $teamArray = [
                    'id'            =>  $team->id,
                    'name'          =>  $team->name
                ];
                $result     =   $this->teams->showMemberFlTeam($id);
                if (empty($result)) {
                    return response()->json([
                        'message'   =>  'Showing members follow team fail!',
                        'status'    =>  false
                    ], 404);
                } else {
                    return response()->json([
                        'message'   =>  'Showing members follow team successfully!',
                        'status'    =>  true,
                        'members'   =>  $result,
                        'teamArray' =>  $teamArray
                    ], 200);
                }
            }
        }
    }
    public function searchMember($id, Request $request)
    {
        $validator      =   Validator::make($request->all(), [
            'key'       =>  ['max:255']
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json($validator->errors(), 404);
        } else {
            $key    =   $request->key;
            if (empty($key)) {
                return '';
            } else {
                $result =   $this->teams->searchMember($id, $key);
                if (empty($result)) {
                    return response()->json([
                        'message'   =>  'No data!',
                        'status'    =>  false
                    ], 404);
                } else {
                    return response()->json([
                        'message'   =>  'Searching successfully!',
                        'status'    =>  true,
                        'data'      =>  $result
                    ], 200);
                }
            }
        }
    }
    public function addMember($id, Request $request)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()
                ->json([
                    'message'   =>  'The team not found!',
                    'status'    =>  false
                ], 404);
        } else {
            $userId =   $request->id;
            $result =   $this->teams->addMember($id, $userId);
            if (empty($result)) {
                return response()->json([
                    'message'   =>  'Adding a member follow team fail!',
                    'status'    =>  false
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Adding a member follow team successfully!',
                    'status'    =>  true,
                    'members'   =>  $result
                ], 200);
            }
        }
    }
    public function deleteMember($id, $idU)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()
                ->json([
                    'message'   =>  'The team not found!',
                    'status'    =>  false
                ], 404);
        }
        $JWTRole    =   JWTAuth::user()->role;
        if ($JWTRole != 'Super Admin') {
            $JWTTeamId  =   JWTAuth::user()->team_id;
            if ($JWTTeamId != $id) {
                return response()
                    ->json([
                        'message'   =>  'You cannot delete members of other team!',
                        'status'    =>  false
                    ], 404);
            }
        }
        $user   =   User::where('id', $idU)->first();
        if ($user->team_id == 0) {
            return response()
                ->json([
                    'message'   =>  'The team member not found!',
                    'status'    =>  false
                ], 404);
        }
        $result =   $this->teams->deleteMember($idU);
        if (empty($result)) {
            return response()->json([
                'message'   =>  'Destroying the member fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Destroying the member successfully!',
                'status'    =>  true,
                'members'   =>  $result
            ], 200);
        }
    }
    public function searchMemberFlTeam($id, Request $request)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()
                ->json([
                    'message'   =>  'The team not found!',
                    'status'    =>  false
                ], 404);
        } else {
            $key    =   $request->key;
            if (empty($key)) {
                return '';
            } else {
                $result =   $this->teams->searchMemberFlTeam($id, $key);
                return $result;
                if (empty($result)) {
                    return response()->json([
                        'message'   =>  'Searching the member follow team fail!',
                        'status'    =>  false
                    ], 404);
                } else {
                    return response()->json([
                        'message'   =>  'Searching the member follow team successfully!',
                        'status'    =>  true,
                        'members'   =>  $result
                    ], 200);
                }
            }
        }
    }
    public function getId()
    {
        $result =   $this->teams->getId();
        if (empty($result)) {
            return response()->json([
                'message'   =>  'Show all id follow team fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all id follow team  successfully!',
                'status'    =>  true,
                'data'   =>  $result
            ], 200);
        }
    }
}
