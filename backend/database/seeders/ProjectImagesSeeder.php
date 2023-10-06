<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\ProjectImage;

class ProjectImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            if ($project->id <= 2) {
                for ($i = 1; $i <= 2; $i++) {
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_url' => "imagem_projeto{$project->id}_{$i}.jpg",
                    ]);
                }
            } else {
            }
        }
    }
}
