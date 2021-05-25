<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('site')->insert(
            [
                'name' => 'My App',
                'slug' => 'myapp',
                'logo_url' => 'seed/logo.svg',
                'facebook_url' => 'facebook.com/myapp',
                'call_to_action_title' => 'Agenda un demo',
                'call_to_action_text' => 'At vero eos et accusamus et iusto odio dignissimos ducimus.',
                'software_url' => 'company.com/myapp',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]
        );
    }
}
