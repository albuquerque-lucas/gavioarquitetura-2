<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project1 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 1',
            'description' => 'Descrição do Projeto 1',
            'area' => 100,
            'year' => 2022,
            'address' => 'Endereço do Projeto 1',
            'image_url' => 'no-image.jpg',
        ]);

        $project2 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 2',
            'description' => 'Descrição do Projeto 2',
            'area' => 300,
            'year' => 2023,
            'address' => 'Endereço do Projeto 2',
            'image_url' => 'no-image.jpg',
        ]);

        $project3 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 3',
            'description' => 'Descrição do Projeto 3',
            'area' => 200,
            'year' => 2024,
            'address' => 'Endereço do Projeto 3',
            'image_url' => 'no-image.jpg',
        ]);
    }
}
