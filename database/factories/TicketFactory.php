<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $teamsUrl = fake()->regexify('^https://teams\.microsoft\.com/l/meetup-join/\w+/\w+\?ocid=teams-tenantapp');

        return [
            'request_type' => fake()->numberBetween(0, 5),
            'description' => fake()->paragraph(),
            'stadium' => fake()->numberBetween(1, 4),
            'file' => fake()->imageUrl(),
            'user_id' => fake()->numberBetween(1, 10),
            'azienda_id' => fake()->numberBetween(1, 10),
            'group' => fake()->numberBetween(1, 3),
            'support_id' => fake()->numberBetween(1, 10),
            'teams_url' => $teamsUrl,
            'time' => fake()->numberBetween(1, 4) * 60,
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->optional($weight = 0.7)->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
