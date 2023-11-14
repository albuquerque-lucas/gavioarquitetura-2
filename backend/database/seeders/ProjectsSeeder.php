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

        // $project5 = Project::create([
        //     'category_id' => 2,
        //     'active_carousel' => false,
        //     'name' => 'Projeto 5',
        //     'description' => 'Descrição do Projeto 5',
        //     'area' => 250,
        //     'year' => 2026,
        //     'address' => 'Endereço do Projeto 5',
        // ]);

        // $project6 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 6',
        //     'description' => 'Descrição do Projeto 6',
        //     'area' => 180,
        //     'year' => 2027,
        //     'address' => 'Endereço do Projeto 6',
        // ]);
        // $project7 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 7',
        //     'description' => 'Descrição do Projeto 7',
        //     'area' => 180,
        //     'year' => 2027,
        //     'address' => 'Endereço do Projeto 7',
        // ]);
        // $project8 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 8',
        //     'description' => 'Descrição do Projeto 8',
        //     'area' => 180,
        //     'year' => 2027,
        //     'address' => 'Endereço do Projeto 8',
        // ]);
        // $project9 = Project::create([
        //     'category_id' => 2,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 9',
        //     'description' => 'Descrição do Projeto 9',
        //     'area' => 280,
        //     'year' => 2031,
        //     'address' => 'Endereço do Projeto 9',
        // ]);
        
        // $project10 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => false,
        //     'name' => 'Projeto 10',
        //     'description' => 'Descrição do Projeto 10',
        //     'area' => 220,
        //     'year' => 2032,
        //     'address' => 'Endereço do Projeto 10',
        // ]);
        
        // $project11 = Project::create([
        //     'category_id' => 1,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 11',
        //     'description' => 'Descrição do Projeto 11',
        //     'area' => 170,
        //     'year' => 2033,
        //     'address' => 'Endereço do Projeto 11',
        // ]);
        // $project12 = Project::create([
        //     'category_id' => 2,
        //     'active_carousel' => false,
        //     'name' => 'Projeto 12',
        //     'description' => 'Descrição do Projeto 12',
        //     'area' => 190,
        //     'year' => 2034,
        //     'address' => 'Endereço do Projeto 12',
        // ]);
        
        // $project13 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 13',
        //     'description' => 'Descrição do Projeto 13',
        //     'area' => 260,
        //     'year' => 2035,
        //     'address' => 'Endereço do Projeto 13',
        // ]);
        
        // $project14 = Project::create([
        //     'category_id' => 1,
        //     'active_carousel' => false,
        //     'name' => 'Projeto 14',
        //     'description' => 'Descrição do Projeto 14',
        //     'area' => 150,
        //     'year' => 2036,
        //     'address' => 'Endereço do Projeto 14',
        // ]);
        
        // $project15 = Project::create([
        //     'category_id' => 2,
        //     'active_carousel' => true,
        //     'name' => 'Projeto 15',
        //     'description' => 'Descrição do Projeto 15',
        //     'area' => 200,
        //     'year' => 2037,
        //     'address' => 'Endereço do Projeto 15',
        // ]);
        
        // $project16 = Project::create([
        //     'category_id' => 3,
        //     'active_carousel' => false,
        //     'name' => 'Projeto 16',
        //     'description' => 'Descrição do Projeto 16',
        //     'area' => 180,
        //     'year' => 2038,
        //     'address' => 'Endereço do Projeto 16',
        // ]);
    }
}
