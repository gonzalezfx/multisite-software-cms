<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// @codingStandardsIgnoreLine
class CreateSiteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'site',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 40);
                $table->string('slug', 40);
                $table->tinyInteger('show_in_home', false, true)->default(1);
                $table->string('logo_url', 300)->nullable();
                $table->string('contact_email', 60)->nullable();
                $table->string('chat_facebook', 60)->nullable();
                $table->string('chat_whatsapp', 60)->nullable();
                $table->string('facebook_url', 60)->nullable();
                $table->string('linkedin_url', 60)->nullable();
                $table->string('youtube_url', 60)->nullable();
                $table->string('call_to_action_title', 200)->nullable();
                $table->string('call_to_action_text', 2000)->nullable();
                $table->string('call_to_action_button_label', 40)->nullable();
                $table->string('call_to_action_button_url', 100)->nullable();
                $table->string('software_url', 100)->nullable();
                $table->string('software_guides_url', 100)->nullable();
                $table->timestamps();
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
        Schema::dropIfExists('site');
    }
}
