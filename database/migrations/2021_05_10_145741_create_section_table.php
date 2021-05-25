<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreateSectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'section',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('title', 100);
                $table->text('content')->nullable();
                $table->string('image_url', 300)->nullable();
                $table->tinyInteger('alignment_type', false, true);
                $table->tinyInteger('background_type', false, true);
                $table->json('listable_bonus')->nullable();
                $table->string('button_label', 300)->nullable();
                $table->string('button_url', 300)->nullable();
                $table->integer('site_id', false, true);
                $table->timestamps();
                $table->foreign('site_id', 'section_site_id')
                  ->references('id')
                  ->on('site')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
                $table->index('site_id', 'section_site_id_idx');
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
        Schema::dropIfExists('section');
    }
}
