<?php

use Illuminate\Database\Seeder;

class OTsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ots = [
    		[
                'date'      =>  '2019-07-23',
                'hour'      =>  '2',
                'user_id'   =>  '3',
                'team_id'   =>  '2',
            ],
            [
                'date'      =>  '2019-07-24',
                'hour'      =>  '2',
                'user_id'   =>  '4',
                'team_id'   =>  '3',
            ],
            [
                'date'      =>  '2019-07-24',
                'hour'      =>  '2',
                'user_id'   =>  '4',
                'team_id'   =>  '3',
            ],
            [
                'date'      =>  '2019-07-25',
                'hour'      =>  '1',
                'user_id'   =>  '3',
                'team_id'   =>  '2',
            ]
        ];
        DB::table('ots')->insert($ots);
    }
}
