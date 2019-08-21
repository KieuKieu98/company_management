<?php

use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teams = [
    		[
                'name'  =>  'Dragon Team'
            ],
            [
                'name'  =>  'React Team'
            ],
            [
                'name'  =>  'Laravel Team'
            ],
            [
                'name'  =>  'Java Team'
            ]
        ];
        DB::table('teams')->insert($teams);
    }
}
