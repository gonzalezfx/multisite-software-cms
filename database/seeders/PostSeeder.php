<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('post')->insert(
            [
                'title' => 'Estrategias de planeación',
                'author' => 'Jorge Gonzalez',
                'introduction' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'image_url' => 'seed/banner.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('post')->insert(
            [
                'title' => 'Cómo organizar los presupuestos de oficina',
                'author' => 'Jorge Gonzalez',
                'introduction' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'image_url' => 'seed/banner.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ]
        );
        DB::table('post')->insert(
            [
                'title' => 'Segmentando el mercado meidante indicadores financieros de alto rendimiento',
                'author' => 'Jorge Gonzalez',
                'introduction' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'image_url' => 'seed/banner.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
        DB::table('post')->insert(
            [
                'title' => 'Prueba',
                'author' => 'Jorge Gonzalez',
                'introduction' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'content' => 'En Icono Consultoría estamos en una constante búsqueda de herramientas que
                    ayuden a las organizaciones a lograr la optimización de sus procesos,
                    contribuyendo al logro de los objetivos planeado',
                'image_url' => 'seed/banner.jpg',
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
                'site_id' => 1,
            ],
        );
    }
}
