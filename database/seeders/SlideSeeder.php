<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('slide')->insert(
            [
                'first_line' => 'At vero eos et',
                'second_line' => 'accusamus et iusto odio dignissimos',
                'third_line' => 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
                'image_url' => 'seed/banner.jpg',
                'button_label' => 'Mira el video',
                'button_url' => 'https://www.youtube.com/watch?v=IwYuYsJypqY',
                'button_icon_url' => 'seed/video-icon.svg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
    }
}
