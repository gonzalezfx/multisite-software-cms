<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('testimonial')->insert(
            [
                'company_name' => 'Yucatán Premier',
                'description' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque.',
                'logo_url' => 'seed/generic-logo.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('testimonial')->insert(
            [
                'company_name' => 'Company 1',
                'description' => 'Dlores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.',
                'logo_url' => 'seed/generic-logo.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('testimonial')->insert(
            [
                'company_name' => 'Company 2',
                'description' => 'Et harum quidem rerum facilis est et
                expedita distinctio.',
                'logo_url' => 'seed/generic-logo.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
        DB::table('testimonial')->insert(
            [
                'company_name' => 'Company 3',
                'description' => 'At vero eos et accusamus et iusto odio.',
                'logo_url' => 'seed/generic-logo.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
    }
}
