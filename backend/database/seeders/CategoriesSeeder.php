<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Residencial', 'code' => 100]);
        Category::create(['name' => 'Interiores', 'code' => 200]);
        Category::create(['name' => 'Comercial', 'code' => 300]);
    }
}
