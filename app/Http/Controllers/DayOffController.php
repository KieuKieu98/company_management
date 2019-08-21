<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\DayOff;
use App\User;
use App\Repositories\DayOffs\DayOffRepository;
use Validator;

class DayOffController extends Controller
{
    protected $day_offs;
    public function __construct(DayOffRepository $day_offs)
    {
        $this->day_offs  =   $day_offs;
    }
    public function store(Request $request)
    {
        $currentId      =   JWTAuth::user()->id;
        $currentRole    =   JWTAuth::user()->role;
        if ($currentRole != 'Super Admin') {
            $user       =   User::where([
                'id'            =>  $currentId,
                'deleted_at'    =>  null
            ])->get();
            if (empty($user)) {
                return response()->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false,
                ], 404);
            }
        }
        $validator  = Validator::make($request->all(), [
            'reason'        =>  ['min:1', 'max:255'],
            'from_date'     =>  ['date'],
            'hour'          =>  ['integer']
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json([
                $validator->errors()
            ], 404);
        }
        $DOArrays       = [
            'reason'    =>  $request->reason,
            'from_date' =>  $request->from_date,
            'hour'      =>  $request->hour,
            'status'   =>  'Waiting',
            'user_id'   =>  $currentId
        ];
        $result =   $this->day_offs->store($DOArrays);
        if (!$result) {
            return response()->json([
                'message'   =>  'Creating day off fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Create day off successfully!',
                'status'    =>  true,
                'data'      =>  $DOArrays
            ], 200);
        }
    }
    public function update($id, Request $request)
    {
        $day_off    =   DayOff::where('id', $id)->first();
        if (empty($day_off)) {
            return response()->json([
                'message'   =>  'Day off not found!',
                'status'    =>  false
            ], 404);
        }
        if ($day_off->status == 'Accepted') {
            return response()->json([
                'message'   =>  'You dont need edit when your request accepted!',
                'status'    =>  false
            ], 404);
        }
        $JWTRole    =   JWTAuth::user()->role;
        if ($JWTRole != 'Super Admin') {
            $JWTId  =   JWTAuth::user()->id;
            if ($JWTId != $day_off->user_id) {
                return response()->json([
                    'message'   =>  'You can edit day off of other member!',
                    'status'    =>  false
                ], 404);
            }
        }
        $validator  = Validator::make($request->all(), [
            'reason'        =>  ['min:1', 'max:255'],
            'from_date'     =>  ['date'],
            'hour'          =>  ['integer']
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json([
                $validator->errors()
            ], 404);
        }
        $DOArrays   =   [
            'reason'    =>  $request->reason,
            'from_date' =>  $request->from_date,
            'hour'      =>  $request->hour,
        ];
        $result =   $this->day_offs->update($id, $DOArrays);
        if (!$result) {
            return response()->json([
                'message'   =>  'Updating day off fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Updating day off successfully!',
                'status'    =>  true,
                'data'      =>  $DOArrays
            ], 200);
        }
    }
    public function all()
    {
        $result =   $this->day_offs->all();
        if (!$result) {
            return response()->json([
                'message'   =>  'Show all day off for super admin fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all day off for super admin successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function userAll()
    {
        $JWTId      =   JWTAuth::user()->id;
        $result     =   $this->day_offs->userAll($JWTId);
        if (!$result) {
            return response()->json([
                'message'   =>  'Show all day off for user fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all day off for user successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function showAllAprroved() 
    {
        $id     =   JWTAuth::user()->id;
        $result =   $this->day_offs->showAllAprroved($id);
        if (!$result) {
            return response()->json([
                'message'   =>  'Show all accepted day off request fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all accepted day off request successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ]);
        }
    }
    public function show($id)
    {
        $day_off    =   DayOff::where('id', $id)->first();
        if (empty($day_off)) {
            return response()->json([
                'message'   =>  'Day off not exit!',
                'status'    =>  false,
            ], 404);
        }
        $JWTRole    =   JWTAuth::user()->role;
        if ($JWTRole != 'Super Admin') {
            $JWTId  =   JWTAuth::user()->id;
            if ($JWTId != $day_off->user_id) {
                return response()->json([
                    'message'   =>  'You can view day off of another one!',
                    'status'    =>  false,
                ], 404);
            }
        }
        $result     =   $this->day_offs->show($id);
        if (!$result) {
            return response()->json([
                'message'   =>  'Show one day off fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show one day off successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function destroy($id)
    {
        $day_off    =   DayOff::where('id', $id)->first();
        if (empty($day_off)) {
            return response()->json([
                'message'   =>  'Day off not found!',
                'status'    =>  false
            ], 404);
        }
        $JWTRole = JWTAuth::user()->role;
        $day_off_user   =   $day_off->user_id;
        if ($JWTRole != 'Super Admin') {
            $JWTId  =   JWTAuth::user()->id;
            if ($day_off_user != $JWTId) {
                return response()->json([
                    'message'   =>  'You can not delete day off for the other one!',
                    'status'    =>  false
                ], 404);
            }
        }
        $result =   $this->day_offs->destroy($id);
        if (!$result) {
            return response()->json([
                'message'   =>  'Destroying day off fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Destroying day off successfully!',
                'status'    =>  true
            ]);
        }
    }
    public function approve($id, Request $request)
    {
        $day_offs   =   DayOff::find($id);
        if (empty($day_offs)) {
            return response()->json([
                'message'   =>  'The day off not found!',
                'status'    =>  false
            ], 404);
        }
        if ($day_offs->status == 'Accepted') {
            return response()->json([
                'message'   =>  'This day off request has accepted!',
                'status'    =>  false
            ], 404);
        }
        $day_offs->status  =   $request->status;
        $result =   $day_offs->save();
        if (!$result) {
            return response()->json([
                'message'   =>  'Approving day off fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Approving day off successfully!',
                'status'    =>  true
            ]);
        }
    }
    public function cancel($id, Request $request)
    {
        $day_offs   =   DayOff::find($id);
        if (empty($day_offs)) {
            return response()->json([
                'message'   =>  'The day off not found!',
                'status'    =>  false
            ], 404);
        }
        if ($day_offs->status == 'Accepted') {
            return response()->json([
                'message'   =>  'This day off request has accepted!',
                'status'    =>  false
            ], 404);
        }
        $day_offs->status  =   $request->status;
        $result =   $day_offs->save();
        if (!$result) {
            return response()->json([
                'message'   =>  'Canceling day off fail!',
                'status'    =>  false
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Canceling day off successfully!',
                'status'    =>  true
            ]);
        }
    }
    public function showAllStatus()
    {
        $result =   $this->day_offs->showAllStatus();
        if (!$result) {
            return response()->json([
                'message'   =>  'Show all day off for super admin fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show all day off for super admin successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function allWaiting(){
        $result =   $this->day_offs->allWaiting();
        if (!$result) {
            return response()->json([
                'message'   =>  'Show total waiting day off fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show total waiting day off successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function allAccepted(){
        $result =   $this->day_offs->allAccepted();
        if (!$result) {
            return response()->json([
                'message'   =>  'Show total accepted day off fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show total accepted day off successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
    public function allDeclined(){
        $result =   $this->day_offs->allDeclined();
        if (!$result) {
            return response()->json([
                'message'   =>  'Show total declined day off fail!',
                'status'    =>  false,
            ], 404);
        } else {
            return response()->json([
                'message'   =>  'Show total declined day off successfully!',
                'status'    =>  true,
                'data'      =>  $result
            ], 200);
        }
    }
}