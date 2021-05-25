<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreateSlideTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'slide',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('first_line', 200)->nullable();
                $table->string('second_line', 200)->nullable();
                $table->string('third_line', 1000)->nullable();
                $table->string('image_url', 300)->nullable();
                $table->string('button_label', 300)->nullable();
                $table->string('button_url', 300)->nullable();
                $table->integer('site_id', false, true);
                $table->timestamps();
                $table->foreign('site_id', 'slide_site_id')
                  ->references('id')
                  ->on('site')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
                $table->index('site_id', 'slide_site_id_idx');
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
        Schema::dropIfExists('slide');
    }
}
