<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreateTestimonialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'testimonial',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('company_name', 100);
                $table->string('description', 2000);
                $table->string('logo_url', 300);
                $table->integer('site_id', false, true);
                $table->timestamps();
                $table->foreign('site_id', 'testimonial_site_id')
                ->references('id')
                ->on('site')
                ->onDelete('restrict')
                ->onUpdate('cascade');
                $table->index('site_id', 'testimonial_site_id_idx');
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
        Schema::dropIfExists('testimonial');
    }
}
