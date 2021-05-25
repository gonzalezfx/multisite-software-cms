<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\City;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class PropertyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Property::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $randomPropertyType = PropertyType::inRandomOrder()->first();
        $randomCity = City::inRandomOrder()->first();
        $randomAgent = Agent::inRandomOrder()->first();

        return [
            'name' => $this->faker->sentence(3),
            'half_bathroom_quantity' => $this->faker->numberBetween(1, 3),
            'bathroom_quantity' => $this->faker->numberBetween(1, 3),
            'bedroom_quantity' => $this->faker->numberBetween(1, 5),
            'floor_quantity' => $this->faker->numberBetween(1, 2),
            'construction_square_meter' => $this->faker->numberBetween(80, 250),
            'land_square_meter' => $this->faker->numberBetween(100, 320),
            'introduction' => $this->faker->paragraph(2),
            'description' => $this->faker->paragraphs(3, true),
            'rent_requirements' => $this->faker->paragraphs(2, true),
            'assessment_free' => rand(0, 1),
            'location_latitude' => $this->faker->latitude(20.896405, 21.045865),
            'location_longitude' => $this->faker->longitude(-89.703567, -89.562794),
            'location_colony' => $this->faker->secondaryAddress(),
            'location_address' => $this->faker->streetAddress(),
            'owner_data' => $this->faker->paragraphs(2, true),
            'has_amenities' => $this->faker->numberBetween(0, 1),
            'has_pool' => $this->faker->numberBetween(0, 1),
            'property_type_id' => $randomPropertyType->id,
            'city_id' => $randomCity->id,
            'agent_id' => $randomAgent->id,
        ];
    }

    /**
     * Properties for rent.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function rent()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_rent_operation' => 1,
                'rent_price' => $this->faker->randomFloat(0, 1000, 25000),
            ];
        });
    }

    /**
     * Properties for rent.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function sell()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_sell_operation' => 1,
                'sell_price' => $this->faker->randomFloat(0, 200000, 3500000),
            ];
        });
    }

    /**
     * Properties for rent.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function sellAndRent()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_rent_operation' => 1,
                'is_sell_operation' => 1,
                'rent_price' => $this->faker->randomFloat(0, 1000, 25000),
                'sell_price' => $this->faker->randomFloat(0, 200000, 3500000),
            ];
        });
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterMaking(function (Property $property) {
            //
        })->afterCreating(function (Property $property) {
            DB::table('property_image')->insert([
                'order' => 1,
                'image_url' => 'seed/property-banner-1.jpg',
                'property_id' => $property->id,
            ]);
            DB::table('property_image')->insert([
                'order' => 2,
                'image_url' => 'seed/about-us-banner.jpg',
                'property_id' => $property->id,
            ]);
        });
    }
}
