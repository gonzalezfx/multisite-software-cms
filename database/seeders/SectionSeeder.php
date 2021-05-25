<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('section')->insert(
            [
                'title' => 'At vero eos et accusamus',
                'content' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.',
                'alignment_type' => Section::ALIGNMENT_TYPE_CENTER,
                'background_type' => Section::BACKGROUND_TYPE_WHITE,
                'listable_bonus' => json_encode([ 'Beneficio 1', 'Beneficio 2', 'Beneficio 3', 'Beneficio 4' ]),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('section')->insert(
            [
                'title' => 'Lorem ipsum dolor sit amet',
                'content' => 'Lorem ipsum dolor sit amet',
                'alignment_type' => Section::ALIGNMENT_TYPE_RIGHT,
                'background_type' => Section::BACKGROUND_TYPE_SOFT_GRAY,
                'listable_bonus' => json_encode([ 'Beneficio 1', 'Beneficio 2', 'Beneficio 3', 'Beneficio 4' ]),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('section')->insert(
            [
                'title' => 'At vero eos et accusamus et iusto',
                'content' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                    sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                    mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                    expedita distinctio.',
                'alignment_type' => Section::ALIGNMENT_TYPE_LEFT,
                'background_type' => Section::BACKGROUND_TYPE_BRAND_COLOR,
                'listable_bonus' => json_encode([ 'Beneficio 1', 'Beneficio 2', 'Beneficio 3', 'Beneficio 4' ]),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
    }
}
