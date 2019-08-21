<?php

namespace App\Http\Controllers;

use App\User;
use App\Repositories\Users\UserRepository;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Pagination\Pagination;
use JWTAuth;

class UserController extends Controller
{
    protected $users;
    public function __construct(UserRepository $users)
    {
        $this->users =  $users;
    }
    public function index()
    {
        return $this->users->all();
    }
    public function store(Request $request)
    {
        $validator  = Validator::make($request->all(), [
            'first_name'    =>  ['bail', 'required', 'min:1', 'max:60'],
            'last_name'     =>  ['bail', 'required', 'min:1', 'max:60'],
            'email'         =>  ['bail', 'required', 'max:60', 'email', 'unique:users'],
            'password'      =>  ['bail', 'required', 'min:6', 'max:60'],
            'phone'         =>  ['bail', 'required', 'min:6', 'max:30', 'regex:/[0-9]+$/'],
            'avatar'        =>  ['max:500000'],
            'address'       =>  ['bail', 'required', 'min:6', 'max:255'],
            'date_of_birth' =>  ['bail', 'required', 'date'],
            'role'          =>  ['bail', 'required', 'min:6', 'max:60']
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json($validator->errors(), 404);
        } else {
            $fileName  = "";
            if ($request->hasFile('avatar')) {
                $file       =   $request->avatar;
                $fileName   =   $file->getClientOriginalName();
                Storage::disk('public')->putFileAs('uploads', $file, $fileName);
            } else {
                $fileName   =   "default-avatar.png";
            }
            $userArray = [
                'first_name'    =>  $request->first_name,
                'last_name'     =>  $request->last_name,
                'email'         =>  $request->email,
                'password'      =>  Hash::make($request->password),
                'phone'         =>  $request->phone,
                'avatar'        =>  $fileName,
                'address'       =>  $request->address,
                'gender'        =>  $request->gender,
                'date_of_birth' =>  $request->date_of_birth,
                'role'          =>  $request->role
            ];
            $result = $this->users->store($userArray);
            if (!$result) {
                return response()->json([
                    'message'   =>  'The validation is invalid!',
                    'status'    =>  false
                ], 404);
            } else {
                return response()->json([
                    'message'   =>  'You add the user successfully!',
                    'status'    =>  true,
                    'token'     =>  $result,
                ], 200);
            }
        }
    }
    public function show($id)
    {
        $user   =   User::where('deleted_at', null)->find($id);
        if (empty($user)) {
            return response()
                ->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false,
                ], 404);
        } else {
            $this->users->show($id);
            return response()
                ->json([
                    'message'   =>  'You have show the user successfully!',
                    'status'    =>  true,
                    'user'      =>  $user
                ], 200);
        }
    }
    public function update($id, Request $request)
    {
        $user   =   User::where('deleted_at', null)->find($id);
        if (empty($user)) {
            return response()
                ->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false,
                ], 404);
        } else {
            $JWTAuthRole    =   JWTAuth::user()->role;
            if ($JWTAuthRole != 'Super Admin') {
                $JWTAuthId      =   JWTAuth::user()->id;
                if ($JWTAuthId != $id) {
                    return respose()
                        ->json([
                            'message'   =>  'You must not update other user info!',
                            'status'      => false
                        ]);
                }
            }
            $newPassword    =   $request->new_password;
            $currentAvatar  =   $user->avatar;
            $currentPhone   =   $user->phone;
            $currentAddress =   $user->address;
            $currentRole    =   $user->role;
            if (!empty($request->new_password)) {
                $validator  = Validator::make($request->all(), [
                    'first_name'                =>  ['bail', 'required', 'min:1', 'max:60'],
                    'last_name'                 =>  ['bail', 'required', 'min:1', 'max:60'],
                    'email'                     =>  ['bail', 'required', 'max:60', 'email', 'unique:users,email,' . $user->id],
                    'new_password'              =>  ['bail', 'required', 'min:6', 'max:60'],
                    'phone'                     =>  ['bail', 'required', 'min:6', 'max:30', 'regex:/[0-9]+$/'],
                    'avatar'                    =>  ['max:500000'],
                    'address'                   =>  ['bail', 'required', 'min:6', 'max:255'],
                    'date_of_birth'             =>  ['bail', 'required', 'date'],
                    'role'                      =>  ['bail', 'required', 'min:6', 'max:60']
                ]);
                if (!empty($validator->errors()->all())) {
                    return response()->json($validator->errors(), 404);
                } else {
                    $fileName  = "";
                    if ($request->hasFile('avatar')) {
                        $file       =   $request->avatar;
                        $fileName   =   $file->getClientOriginalName();
                        Storage::disk('public')->putFileAs('uploads', $file, $fileName);
                    }
                    $userArray = [
                        'first_name'    =>  $request->first_name,
                        'last_name'     =>  $request->last_name,
                        'email'         =>  $request->email,
                        'password'      =>  Hash::make($request->new_password),
                        'phone'         =>  $request->phone     ? $request->phone   : $currentPhone,
                        'avatar'        =>  $fileName           ? $fileName         : $currentAvatar,
                        'address'       =>  $request->address   ? $request->address : $currentAddress,
                        'gender'        =>  $request->gender,
                        'date_of_birth' =>  $request->date_of_birth,
                        'role'          =>  $request->role      ? $request->role    : $currentRole
                    ];
                    $this->users->update($id, $userArray);
                    return response()
                        ->json([
                            'message'   =>  'You update the user successfully!',
                            'status'    =>  true
                        ], 200);
                }
            } else {
                $validator  = Validator::make($request->all(), [
                    'first_name'                =>  ['bail', 'required', 'min:1',  'max:60'],
                    'last_name'                 =>  ['bail', 'required', 'min:1',  'max:60'],
                    'email'                     =>  ['bail', 'required', 'max:60', 'email',  'unique:users,email,' . $user->id],
                    'phone'                     =>  ['bail', 'required', 'min:6',  'max:30', 'regex:/[0-9]+$/'],
                    'avatar'                    =>  ['max:500000'],
                    'address'                   =>  ['bail', 'required', 'min:6', 'max:255'],
                    'date_of_birth'             =>  ['required', 'date'],
                    'role'                      =>  ['bail', 'required', 'min:6', 'max:60']
                ]);
                if (!empty($validator->errors()->all())) {
                    return response()->json($validator->errors(), 404);
                } else {
                    $fileName  = "";
                    if ($request->hasFile('avatar')) {
                        $file       =   $request->avatar;
                        $fileName   =   $file->getClientOriginalName();
                        Storage::disk('public')->putFileAs('uploads', $file, $fileName);
                    }
                    $userArray = [
                        'first_name'    =>  $request->first_name,
                        'last_name'     =>  $request->last_name,
                        'email'         =>  $request->email,
                        'phone'         =>  $request->phone     ? $request->phone   : $currentPhone,
                        'avatar'        =>  $fileName           ? $fileName         : $currentAvatar,
                        'address'       =>  $request->address   ? $request->address : $currentAddress,
                        'gender'        =>  $request->gender,
                        'date_of_birth' =>  $request->date_of_birth,
                        'role'          =>  $request->role      ? $request->role    : $currentRole
                    ];
                    $this->users->update($id, $userArray);
                    return response()
                        ->json([
                            'message'   =>  'You update the user successfully!',
                            'status'    =>  true
                        ], 200);
                }
            }
        }
    }
    public function destroy($id)
    {
        $conditions = [
            ['deleted_at', '=', null],
            ['id', '<>', 1]
        ];
        $user   =   User::where($conditions)->find($id);
        if(empty($user)){
            return response()
                ->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false
                ], 404);
        }
        $user->deleted_at = now();
        $user->save();
        return response()
            ->json([
                'message'   =>  'You delete successfully!',
                'status'    =>  true
            ], 200);
    }
}