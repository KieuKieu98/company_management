<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
    		[
                'first_name'    =>  'Super',
                'last_name'     =>  'Admin',
                'email'         =>  'super_admin@gmail.com',
                'password'      =>  Hash::make('superadmin'),
                'avatar'        =>  'admin_picture.png',
                'phone'         =>  '0868297062',
                'address'       =>  '150 Duy Tân, Hoa Nam, Hải Châu, Đà Nẵng.',
                'gender'        =>  'Other',
                'date_of_birth' =>  '1991-01-21',
                'role'          =>  'Super Admin',
                'created_at'    =>  now(),
                'team_id'       =>  0
            ],
            [
                'first_name'    =>  'Kiểu',
                'last_name'     =>  'Nguyễn',
                'email'         =>  'manager@gmail.com',
                'password'      =>  Hash::make('manager'),
                'avatar'        =>  'manager_picture.png',
                'phone'         =>  '0868297062',
                'address'       =>  '150 Duy Tân, Hòa Thuận Nam, Hải Châu, Đà Nẵng.',
                'gender'        =>  'Male',
                'date_of_birth' =>  '1992-01-22',
                'role'          =>  'Manager',
                'created_at'    =>  now(),
                'team_id'       =>  1   
            ],
            [
                'first_name'    =>  'Thư',
                'last_name'     =>  'Hồ',
                'email'         =>  'developer@gmail.com',
                'password'      =>  Hash::make('developer'),
                'avatar'        =>  'developer_picture.png',
                'phone'         =>  '0868297062',
                'address'       =>  '150 Duy Tân, Hòa Thuận Nam, Hải Châu, Đà Nẵng.',
                'gender'        =>  'Male',
                'date_of_birth' =>  '1995-01-23',
                'role'          =>  'Developer',
                'created_at'    =>  now(),
                'team_id'       =>  2
            ],
            [
                'first_name'    =>  'Phong',
                'last_name'     =>  'Nguyễn',
                'email'         =>  'intern@gmail.com',
                'password'      =>  Hash::make('intern'),
                'avatar'        =>  'intern_picture.png',
                'phone'         =>  '0868297062',
                'address'       =>  '150 Duy Tân, Hòa Thuận Nam, Hải Châu, Đà Nẵng.',
                'gender'        =>  'Female',
                'date_of_birth' =>  '1997-01-24',
                'role'          =>  'Intern',
                'created_at'    =>  now(),
                'team_id'       =>  3
    	    ]
        ];
        DB::table('users')->insert($users);
    }
}
