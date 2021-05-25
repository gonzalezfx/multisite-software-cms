<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('page')->insert(
            [
                'title' => 'Políticas de privacidad',
                'keyword' => 'privacy_policies',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('page')->insert(
            [
                'title' => 'Términos y condiciones',
                'keyword' => 'terms_and_conditions',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('page')->insert(
            [
                'title' => 'Políticas de soporte',
                'keyword' => 'support_policies',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
    }
}
