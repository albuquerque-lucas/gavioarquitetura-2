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
        ]);

        $project2 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 2',
            'description' => 'Descrição do Projeto 2',
            'area' => 300,
            'year' => 2022,
            'address' => 'Endereço do Projeto 2',
        ]);

        $project3 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 3',
            'description' => 'Descrição do Projeto 3',
            'area' => 200,
            'year' => 2024,
            'address' => 'Endereço do Projeto 3',
        ]);
        $project4 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 4',
            'description' => 'Descrição do Projeto 4',
            'area' => 150,
            'year' => 2024,
            'address' => 'Endereço do Projeto 4',
        ]);

        $project5 = Project::create([
            'category_id' => 2,
            'active_carousel' => false,
            'name' => 'Projeto 5',
            'description' => 'Descrição do Projeto 5',
            'area' => 250,
            'year' => 2026,
            'address' => 'Endereço do Projeto 5',
        ]);

        $project6 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 6',
            'description' => 'Descrição do Projeto 6',
            'area' => 180,
            'year' => 2027,
            'address' => 'Endereço do Projeto 6',
        ]);
        $project7 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 7',
            'description' => 'Descrição do Projeto 7',
            'area' => 180,
            'year' => 2027,
            'address' => 'Endereço do Projeto 7',
        ]);
        $project8 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 8',
            'description' => 'Descrição do Projeto 8',
            'area' => 180,
            'year' => 2027,
            'address' => 'Endereço do Projeto 8',
        ]);
        $project9 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 9',
            'description' => 'Descrição do Projeto 9',
            'area' => 280,
            'year' => 2031,
            'address' => 'Endereço do Projeto 9',
        ]);
        
        $project10 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 10',
            'description' => 'Descrição do Projeto 10',
            'area' => 220,
            'year' => 2032,
            'address' => 'Endereço do Projeto 10',
        ]);
        
        $project11 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 11',
            'description' => 'Descrição do Projeto 11',
            'area' => 170,
            'year' => 2033,
            'address' => 'Endereço do Projeto 11',
        ]);
        $project12 = Project::create([
            'category_id' => 2,
            'active_carousel' => false,
            'name' => 'Projeto 12',
            'description' => 'Descrição do Projeto 12',
            'area' => 190,
            'year' => 2034,
            'address' => 'Endereço do Projeto 12',
        ]);
        
        $project13 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 13',
            'description' => 'Descrição do Projeto 13',
            'area' => 260,
            'year' => 2035,
            'address' => 'Endereço do Projeto 13',
        ]);
        
        $project14 = Project::create([
            'category_id' => 1,
            'active_carousel' => false,
            'name' => 'Projeto 14',
            'description' => 'Descrição do Projeto 14',
            'area' => 150,
            'year' => 2036,
            'address' => 'Endereço do Projeto 14',
        ]);
        
        $project15 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 15',
            'description' => 'Descrição do Projeto 15',
            'area' => 200,
            'year' => 2037,
            'address' => 'Endereço do Projeto 15',
        ]);
        
        $project16 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 16',
            'description' => 'Descrição do Projeto 16',
            'area' => 180,
            'year' => 2038,
            'address' => 'Endereço do Projeto 16',
        ]);
        $project17 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 17',
            'description' => 'Descrição do Projeto 17',
            'area' => 160,
            'year' => 2023,
            'address' => 'Endereço do Projeto 17',
        ]);
        
        $project18 = Project::create([
            'category_id' => 2,
            'active_carousel' => false,
            'name' => 'Projeto 18',
            'description' => 'Descrição do Projeto 18',
            'area' => 220,
            'year' => 2023,
            'address' => 'Endereço do Projeto 18',
        ]);
        
        $project19 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 19',
            'description' => 'Descrição do Projeto 19',
            'area' => 190,
            'year' => 2023,
            'address' => 'Endereço do Projeto 19',
        ]);
        
        $project20 = Project::create([
            'category_id' => 1,
            'active_carousel' => false,
            'name' => 'Projeto 20',
            'description' => 'Descrição do Projeto 20',
            'area' => 250,
            'year' => 2023,
            'address' => 'Endereço do Projeto 20',
        ]);
        
        $project21 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 21',
            'description' => 'Descrição do Projeto 21',
            'area' => 180,
            'year' => 2023,
            'address' => 'Endereço do Projeto 21',
        ]);
        
        $project22 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 22',
            'description' => 'Descrição do Projeto 22',
            'area' => 200,
            'year' => 2023,
            'address' => 'Endereço do Projeto 22',
        ]);
        
        $project23 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 23',
            'description' => 'Descrição do Projeto 23',
            'area' => 170,
            'year' => 2023,
            'address' => 'Endereço do Projeto 23',
        ]);
        
        $project24 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 24',
            'description' => 'Descrição do Projeto 24',
            'area' => 210,
            'year' => 2023,
            'address' => 'Endereço do Projeto 24',
        ]);
        
        $project25 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 25',
            'description' => 'Descrição do Projeto 25',
            'area' => 240,
            'year' => 2023,
            'address' => 'Endereço do Projeto 25',
        ]);
        $project26 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 26',
            'description' => 'Descrição do Projeto 26',
            'area' => 180,
            'year' => 2023,
            'address' => 'Endereço do Projeto 26',
        ]);
        
        $project27 = Project::create([
            'category_id' => 2,
            'active_carousel' => false,
            'name' => 'Projeto 27',
            'description' => 'Descrição do Projeto 27',
            'area' => 200,
            'year' => 2023,
            'address' => 'Endereço do Projeto 27',
        ]);
        
        $project28 = Project::create([
            'category_id' => 3,
            'active_carousel' => true,
            'name' => 'Projeto 28',
            'description' => 'Descrição do Projeto 28',
            'area' => 190,
            'year' => 2023,
            'address' => 'Endereço do Projeto 28',
        ]);
        
        $project29 = Project::create([
            'category_id' => 1,
            'active_carousel' => false,
            'name' => 'Projeto 29',
            'description' => 'Descrição do Projeto 29',
            'area' => 220,
            'year' => 2023,
            'address' => 'Endereço do Projeto 29',
        ]);
        
        $project30 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 30',
            'description' => 'Descrição do Projeto 30',
            'area' => 170,
            'year' => 2023,
            'address' => 'Endereço do Projeto 30',
        ]);
        
        $project31 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 31',
            'description' => 'Descrição do Projeto 31',
            'area' => 190,
            'year' => 2023,
            'address' => 'Endereço do Projeto 31',
        ]);
        
        $project32 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 32',
            'description' => 'Descrição do Projeto 32',
            'area' => 200,
            'year' => 2023,
            'address' => 'Endereço do Projeto 32',
        ]);
        
        $project33 = Project::create([
            'category_id' => 2,
            'active_carousel' => true,
            'name' => 'Projeto 33',
            'description' => 'Descrição do Projeto 33',
            'area' => 210,
            'year' => 2023,
            'address' => 'Endereço do Projeto 33',
        ]);
        
        $project34 = Project::create([
            'category_id' => 3,
            'active_carousel' => false,
            'name' => 'Projeto 34',
            'description' => 'Descrição do Projeto 34',
            'area' => 220,
            'year' => 2023,
            'address' => 'Endereço do Projeto 34',
        ]);
        
        $project35 = Project::create([
            'category_id' => 1,
            'active_carousel' => true,
            'name' => 'Projeto 35',
            'description' => 'Descrição do Projeto 35',
            'area' => 180,
            'year' => 2023,
            'address' => 'Endereço do Projeto 35',
        ]);
        
        
    }
}
