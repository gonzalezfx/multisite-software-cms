<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreatePageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'page',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('title', 100);
                $table->string('introduction', 2000)->nullable();
                $table->text('content')->nullable();
                $table->string('image_url', 300)->nullable();
                $table->string('keyword', 60)->unique();
                $table->integer('site_id', false, true);
                $table->timestamps();
                $table->foreign('site_id', 'page_site_id')
                  ->references('id')
                  ->on('site')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
                $table->index('site_id', 'page_site_id_idx');
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
        Schema::dropIfExists('page');
    }
}
