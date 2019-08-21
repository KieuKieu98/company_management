<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Validator;
use Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    public function login(Request $request)
    {
        $email      =   $request->email;
        $password   =   $request->password;
        $user       =   User::where(['email' => $email, 'deleted_at' => null])->first();
        if (empty($user)) {
            return response()->json([
                'message'   =>  'Email does not exit!',
                'status'    =>  false
            ], 404);
        } else {
            $userArray  =   [
                'email'     =>  $request->email,
                'password'  =>  $request->password
            ];
            $check_login    =   JWTAuth::attempt($userArray);
            if (!$check_login) {
                return response()->json([
                    'message'   =>  'Password is not correct!',
                    'status'    =>  false
                ], 404);
            } else {
                $id         =   $user->id;
                $firstName  =   $user->first_name;
                $lastName   =   $user->last_name;
                $email      =   $user->email;
                $role       =   $user->role;
                $avatar     =   $user->avatar;
                return response()->json([
                    'message'   =>  'You login successfully!',
                    'status'    =>  true,
                    'token'     =>  $check_login,
                    'id'        =>  $id,
                    'first_name' =>  $firstName,
                    'last_name'  =>  $lastName,
                    'email'     =>  $email,
                    'role'      =>  $role,
                    'avatar'    => $avatar
                ], 200);
            }
        }
    }
    public function logout(Request $request)
    {
        JWTAuth::invalidate($request->token);
        return response()->json([
            'message'   =>  'You logout successfully!',
            'status'    =>  true
        ]);
    }
    public function sendMail(Request $request)
    {
        $validator  =   Validator::make($request->all(), [
            'email' =>  ['bail', 'required', 'max:60', 'email']
        ]);
        if (!empty($validator->errors()->all())) {
            return response()->json($validator->errors(), 404);
        } else {
            $emailInput =   $request->email;
            $checkEmail =   User::where([
                'deleted_at'    =>  null,
                'email'         =>  $emailInput
            ])->first();
            if (empty($checkEmail)) {
                return response()
                    ->json([
                        'message'   =>  'Your email does not exist!',
                        'status'    =>  false
                    ], 404);
            } else {
                $resetToken             =   Str::random();
                $user                   =   User::where(
                    [
                        'deleted_at'    =>  null,
                        'email'         =>  $request->email
                    ]
                )->first();
                if (empty($user)) {
                    return response()
                        ->json([
                            'message'   =>  'The user not found!',
                            'status'    =>  false,
                        ], 404);
                } else {
                    $user->token_reset      =   $resetToken;
                    $user->expired_reset    =   Carbon::now()->format('Y-m-d H:i:s');
                    $user->save();
                    Mail::send('reset_password', array(
                        'email' =>  $emailInput,
                        'token' =>  $resetToken
                    ), function ($message) use ($emailInput) {
                        $message->to($emailInput, 'Tieutinh')->subject('Change password!');
                    });
                    return response()
                        ->json([
                            'message'   =>  'Your request has been sent to your email!',
                            'status'    =>  true,
                            'token'     =>  $resetToken,
                            'email'     =>  $emailInput
                        ], 200);
                }
            }
        }
    }
    public function checkToken(Request $request)
    {
        $user = User::where(
            [
                'deleted_at'    =>  null,
                'token_reset'   =>  $request->token
            ]
        )->first();
        if (empty($user)) {
            return response()
                ->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false,
                ], 404);
        } else {
            $expiredReset       =   $user->expired_reset;
            $expiredResetNow    =   Carbon::createFromFormat('Y-m-d H:i:s', $expiredReset);
            $timeNow            =   Carbon::now();
            $checkexpiredReset  =   $expiredResetNow->diffInMinutes($timeNow);
            if ($checkexpiredReset <= 15) {
                return response()
                    ->json([
                        'message'   =>   'Token valid, you can reset password!',
                        'status'    =>   true,
                        'token'     =>    $request->token
                    ], 200);
            } else {
                return response()
                    ->json([
                        'message'   =>   'Token expired, you need to send email again!',
                        'status'    =>   false
                    ], 404);
            }
        }
    }
    public function changePass(Request $request)
    {
        $user = User::where(
            [
                'deleted_at'    =>  null,
                'token_reset'   =>  $request->token
            ]
        )->first();
        if (empty($user)) {
            return response()
                ->json([
                    'message'   =>  'The user not found!',
                    'status'    =>  false,
                ], 404);
        } else {
            $validator  = Validator::make($request->all(), [
                'new_password'      =>  ['bail', 'required', 'min:6', 'max:60'],
            ]);
            if (!empty($validator->errors()->all())) {
                return response()->json($validator->errors(), 404);
            } else {
                $user->password = Hash::make($request->new_password);
                $user->save();
                return response()
                    ->json([
                        'message'   =>  'Reset password successfully!',
                        'status'    =>  true
                    ], 200);
            }
        }
    }
}