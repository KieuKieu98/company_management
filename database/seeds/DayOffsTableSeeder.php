<?php

use Illuminate\Database\Seeder;

class DayOffsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $day_offs = [
            [
                'reason'    =>  'I am onsite. I want to absent',
                'from_date' =>  '2019-07-23',
                'hour'      =>  '2',
                'status'   =>  'Accepted',
                'user_id'   =>  '2',
            ],
            [
                'reason'    =>  'I am sick. I want to absent',
                'from_date' =>  '2019-07-23',
                'hour'      =>  '3',
                'status'   =>  'Accepted',
                'user_id'   =>  '3',
            ],
            [
                'reason'    =>  'I am traveling. I want to absent',
                'from_date' =>  '2019-07-23',
                'hour'      =>  '5',
                'status'   =>  'Waiting',
                'user_id'   =>  '4',
            ],
            [
                'reason'    =>  'I am sick. I want to absent',
                'from_date' =>  '2019-07-27',
                'hour'      =>  '10',
                'status'   =>   'Declined',
                'user_id'   =>  '4',
            ]
        ];
        DB::table('day_offs')->insert($day_offs);
    }
}
