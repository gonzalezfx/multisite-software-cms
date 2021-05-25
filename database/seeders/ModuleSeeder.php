<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('module')->insert(
            [
                'name' => 'Presupuestos',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'icon_url' => 'seed/budget-icon.svg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('module')->insert(
            [
                'name' => 'Cotizaciones',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                ayuden a las organizaciones a lograr la optimización de sus procesos,
                contribuyendo al logro de los objetivos planeado',
                'icon_url' => 'seed/budget-icon.svg',
                'image_url' => 'seed/banner.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('module')->insert(
            [
                'name' => 'Ordenes de compra',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'icon_url' => 'seed/budget-icon.svg',
                'listable_bonus' => json_encode([ 'Agil', 'Preciso' ]),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
        DB::table('module')->insert(
            [
                'name' => 'Gastos por comprobar',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'icon_url' => 'seed/budget-icon.svg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
    }
}
