<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(TeamsTableSeeder::class);
        $this->call(OTsTableSeeder::class);
        $this->call(DayOffsTableSeeder::class);
        $this->call(DocumentsTableSeeder::class);
    }
}
