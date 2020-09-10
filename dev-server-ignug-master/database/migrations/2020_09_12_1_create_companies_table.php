<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('pgsql-authentication')->create('companies', function (Blueprint $table) {
            //$table->id();
           // $table->foreignId('user_id')->constrained('authentication.users');
            //$table->foreignId('type_id')->constrained('catalogues');
            //$table->foreignId('state_id')->constrained('ignug.states');
            /*$table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('state_id');
            $table->string('trade_name', 300);
            $table->string('comercial_activity', 500);
            $table->string('web_page', 500);            
            $table->timestamps();
            $table->foreign('user_id')
            ->references('id')->on('users')
            ->onDelete('cascade');
            $table->foreign('type_id')
            ->references('id')->on('catalogues')
            ->onDelete('cascade');
            $table->foreign('state_id')
            ->references('id')->on('states')
            ->onDelete('cascade');*/
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('identity');
            $table->string('nature');
            $table->string('email');
            $table->string('trade_name',300);
            $table->string('comercial_activity',500);
            $table->string('phone');
            $table->string('cell_phone')->nullable();
            $table->string('web_page')->nullable();
            $table->string('address');
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
        Schema::connection('pgsql-authentication')->dropIfExists('companies');
    }
}
