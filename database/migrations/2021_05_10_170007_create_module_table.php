<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreateModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'module',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 100);
                $table->text('content')->nullable();
                $table->string('icon_url', 300)->nullable();
                $table->string('image_url', 300)->nullable();
                $table->json('listable_bonus')->nullable();
                $table->integer('site_id', false, true);
                $table->timestamps();
                $table->foreign('site_id', 'module_site_id')
                  ->references('id')
                  ->on('site')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
                $table->index('site_id', 'module_site_id_idx');
                $table->engine = 'InnoDB';
                $table->charset = 'utf8mb4';
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('module');
    }
}
