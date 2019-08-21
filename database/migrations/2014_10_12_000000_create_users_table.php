<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar')->default('avatar.png');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('token_reset')->nullable();
            $table->string('role')->default('Intern');
            $table->timestamp('expired_reset')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
            // $table->timestamp('email_verified_at')->nullable();
            // $table->rememberToken();
        });
    }
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
