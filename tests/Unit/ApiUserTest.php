<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use JWTAuth;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Http\Request;

class UserTest extends TestCase
{
    //Login fail with invalid email
    public function test_user_can_not_login_with_invalid_email()
    {
        $response = $this->post(
            'api/login',
            [
                'email'     =>  'wrong_email@gmail.com',
                'password'  =>  'superadmin'
            ]
        );
        $response->assertNotFound();
    }
    //Login fail with invalid password
    public function test_user_can_not_login_with_invalid_password()
    {
        $response = $this->post(
            'api/login',
            [
                'email'     =>  'super_admin@gmail.com',
                'password'  =>  'wrong_password'
            ]
        );
        $response->assertNotFound();
    }
    //Login success with valid data
    public function test_user_can_login_with_valid_data()
    {
        $response = $this->post(
            'api/login',
            [
                'email'     =>  'super_admin@gmail.com',
                'password'  =>  'superadmin'
            ]
        );
        $response->assertOk();
    }
    //Logout success
    public function test_user_can_logout_with_valid_token()
    {
        $login      = $this->json(
            'POST',
            'api/login',
            [
                'email'         => 'super_admin@gmail.com',
                'password'      => 'superadmin'
            ]
        );
        $response   = $this->withHeaders(
            [
                'Authorization' => 'Bearer '.$login->original['token']
            ]
        )->json(
            'POST',
            'api/logout' 
        );
        $response->assertOk();
    }
    public function test_user_could_not_be_created_when_first_name_field_is_required()
    {
        $login      = $this->json(
            'POST',
            'api/login',
            [
                'email'         => 'super_admin@gmail.com',
                'password'      => 'superadmin'
            ]
        );
        // dd($login);
        $response   = $this->withHeaders(
            [
                'Authorization' => 'Bearer '.$login->original['token']
            ]
        )->json(
            'POST',
            'api/users', 
            [
                'first_name'    =>  '',
                'last_name'     =>  'Hồ',
                'email'         =>  'tamtam@gmail.com',   
                'password'      =>  Hash::make('tamho123'),
                'phone'         =>  '0868297062',
                'avatar'        =>  'tam.pic',
                'address'       =>  'Đà Nẵng',
                'gender'        =>  'Male',
                'date_of_birth' =>  '1999-01-01',
                'role'          =>  'Intern'
            ]
        );
        $error  =   $response->original->get('first_name');
        $check  =   in_array('', $error);
        $a = $this->assertEquals($check, false);
        // $error kiểm tra mảng này có chưa phần tử ''
        // $this->assertEquals($ketquakiemtra, true)
    }
}