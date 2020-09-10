<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('pgsql-authentication')->create('users', function (Blueprint $table) {
            /*$table->id();
            $table->foreignId('ethnic_origin_id')->constrained('catalogues');
            $table->foreignId('location_id')->constrained('catalogues');
            $table->foreignId('identification_type_id')->constrained('catalogues');
            $table->string('identification', 20);
            $table->string('postal_code', 20)->nullable();
            $table->string('first_name', 1000);
            $table->string('second_name', 100)->nullable();
            $table->string('first_lastname', 100);
            $table->string('second_lastname', 100)->nullable();
            $table->foreignId('sex_id')->constrained('catalogues');
            $table->foreignId('gender_id')->constrained('catalogues');
            $table->string('personal_email', 100)->nullable()->unique();
            $table->date('birthdate')->nullable();
            $table->bigInteger('blood_type_id')->nullable();
            $table->foreign('blood_type_id')->references('id')->on('catalogues');
            $table->string('user_name', 25);
            $table->string('email', 100)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 200);
            $table->boolean('change_password')->default(false);
            $table->foreignId('state_id')->constrained('states');
            $table->rememberToken();
            $table->timestamps();*/

            $table->increments('id');
            $table->string('name');
            $table->string('user_name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('api_token', 60)->unique();
            $table->string('state')->default('ACTIVE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('pgsql-authentication')->dropIfExists('users');
    }
}
