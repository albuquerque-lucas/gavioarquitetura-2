<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [1, 2, 3];
        $projectsPerCategory = 30;

        foreach ($categories as $category) {
            for ($i = 1; $i <= $projectsPerCategory; $i++) {
                Project::create([
                    'category_id' => $category,
                    'active_carousel' => rand(0, 1),
                    'name' => "Projeto {$category}_{$i}",
                    'description' => "Descrição do Projeto {$category}_{$i}",
                    'area' => rand(100, 300),
                    'year' => rand(2020, 2023),
                    'address' => "Endereço do Projeto {$category}_{$i}",
                    'image_url' => 'projects/cover/no-image.jpg',
                ]);
            }
        }
    }
}
