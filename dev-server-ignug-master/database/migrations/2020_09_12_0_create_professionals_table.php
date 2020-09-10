<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessionalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('pgsql-authentication')->create('professionals', function (Blueprint $table) {
            /*$table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('about_me', 500)->nullable();
            $table->foreignId('state_id')->constrained('states');
            $table->timestamps();*/
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('identity');
            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('nationality');
            $table->string('civil_state');
            $table->date('birthdate');
            $table->string('gender');
            $table->string('phone');
            $table->string('address', 300);
            $table->string('about_me', 300)->nullable();
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
        Schema::connection('pgsql-authentication')->dropIfExists('professionals');
    }
}
