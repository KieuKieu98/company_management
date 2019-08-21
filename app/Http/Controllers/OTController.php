<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use App\Repositories\OTs\OTRepository;
use App\Team;
use App\OT;

class OTController extends Controller
{
    protected $ots;
    public function __construct(OTRepository $ots)
    {
        $this->ots  =   $ots;
    }
    public function allDataSort(Request $request)
    {
        $key        =   $request->key;
        $sortDate   =   $request->sortDate;
        $sortHour   =   $request->sortHour;
        $result     =   $this->ots->allDataSort($key, $sortDate, $sortHour);
        if (!$result) {
            return response()->json([
                'message'   =>  'Show all members registed OT time fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all members registed OT time successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function showTeam($id)
    {
        $team   =   Team::find($id);
        if (empty($team)) {
            return response()->json([
                'message'   =>  'The team not found!',
                'status'    =>  false
            ], 404);
        } else {
            $role     =   JWTAuth::user()->role;
            if ($role != 'Super Admin') {
                $m_id   =  JWTAuth::user()->team_id;
                if ($m_id != $id) {
                    return response()->json([
                        'message'   =>  'You cant see OT time of other team fail!',
                        'status'    =>  false
                    ], 404);
                }
            }
            $result =   $this->ots->showTeam($id);
            if (!$result) {
                return response()->json([
                    'message'   =>  'Show the member registed follow team fail!',
                    'status'    =>  false,
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Show the member registed follow team successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ], 200);
            }
        }
    }
    public function showOneOT($id)
    {
        $ot =   OT::where('id', $id)->find($id);
        if (empty($ot)) {
            return response()->json([
                'message'   =>  'The OT not found!',
                'status'    =>  false,
            ], 404);
        } else {
            $result = $this->ots->showOneOT($id);
            if (!$result) {
                return response()->json([
                    'message'   =>  'Show a OT fail!',
                    'status'    =>  false,
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Show a OT successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ], 200);
            }
        }
    }
    public function show()
    {
        $id     =   JWTAuth::user()->id;
        $result =   $this->ots->show($id);
        if (!$result) {
            return response()->json([
                'message'   =>  'Show a member registed  fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show a member registed  successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function store($id, Request $request)
    {
        $u_id       =   $request->user_id;
        $user       =   User::where('deleted_at', null)->find($u_id);
        $firstName  =   $user->first_name;
        $lastName   =   $user->last_name;
        $email      =   $user->email;
        $avatar     =   $user->avatar;
        $u_team     =   $user->team_id;
        if (empty($user)) {
            return response()->json([
                'message'   =>  'The user not found!',
                'status'    =>  false
            ], 404);
        } else {
            $role     =   JWTAuth::user()->role;
            if ($role != 'Super Admin') {
                $m_team_id  =   JWTAuth::user()->team_id;
                $teamUserId =   $user->team_id;
                if ($m_team_id != $id || $teamUserId != $id) {
                    return response()->json([
                        'message'   =>  'The manager can not register OT time for other team!',
                        'status'    =>  false
                    ], 404);
                } else {
                    $m_id   =   JWTAuth::user()->id;
                    if ($u_id == $m_id) {
                        return response()->json([
                            'message'   =>  'The manager can not register OT time for them by themselves!',
                            'status'    =>  false
                        ], 404);
                    }
                }
            }
            $date   =   $request->date;
            $hour   =   $request->hour;
            $OTArray    =   [
                'date'      =>  $date,
                'hour'      =>  $hour,
                'user_id'   =>  $u_id,
                'team_id'   =>  $u_team,
                'first_name' =>  $firstName,
                'last_name' =>  $lastName,
                'email'     =>  $email,
                'avatar'    =>  $avatar,
            ];
            $result =   $this->ots->store($OTArray);
            if (!$result) {
                return response()->json([
                    'message'   =>  'Creating OT hour for the user fail!',
                    'status'    =>  false
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Creating OT hour for the user successfully!',
                    'status'    =>  true,
                    'data'      =>  $OTArray
                ], 200);
            }
        }
    }
    public function update($id, Request $request)
    {
        $uId        =   $request->user_id;
        $ot         =   OT::where('id', $id)->find($id);
        $user       =   User::where('deleted_at', null)->find($uId);
        if (empty($ot)) {
            return response()->json([
                'message'   =>  'The OT time hour not found!',
                'status'    =>  false
            ], 404);
        } else {
            if (empty($user)) {
                return response()->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false
                ], 404);
            } else {
                $role       =   JWTAuth::user()->role;
                $team_id    =   $user->team_id;
                if ($role != 'Super Admin') {
                    $team_ot    =   $ot->team_id;
                    if ($team_ot != $team_id) {
                        return response()->json([
                            'message'   =>  'The manager can not update for other member team!',
                            'status'    =>  false
                        ], 404);
                    }
                }
                $otArray    =   [
                    'date'      =>  $request->date,
                    'hour'      =>  $request->hour,
                    'user_id'   =>  $request->user_id,
                    'team_id'   =>  $team_id
                ];
                $result     =   $this->ots->update($id, $otArray);
                if (!$result) {
                    return response()->json([
                        'message'   =>  'Updating OT hour for the user fail!',
                        'status'    =>  false
                    ], 404);
                } else {
                    return response()->json([
                        'message'   =>  'Updating OT hour for the user successfully!',
                        'status'    =>  true,
                        'data'      =>  $otArray
                    ], 200);
                }
            }
        }
    }
    public function destroy($id)
    {
        $ot         =   OT::where('id', $id)->find($id);
        if (empty($ot)) {
            return response()->json([
                'message'   =>  'The OT time hour not found!',
                'status'    =>  false
            ], 404);
        } else {
            $user       =   User::where('deleted_at', null)->find($ot->user_id);
            $role       =   JWTAuth::user()->role;
            $team_id    =   $user->team_id;
            if ($role != 'Super Admin') {
                $team_ot    =   $ot->team_id;
                if ($team_ot != $team_id) {
                    return response()->json([
                        'message'   =>  'The manager can not delete for other member team!',
                        'status'    =>  false
                    ], 404);
                }
            }
            $result =   $this->ots->destroy($id);
            if (!$result) {
                return response()->json([
                    'message'   =>  'Deleting OT hour for the user fail!',
                    'status'    =>  false
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'Deleting OT hour for the user successfully!',
                    'status'    =>  true,
                    'data'      =>  $result
                ], 200);
            }
        }
    }
}
