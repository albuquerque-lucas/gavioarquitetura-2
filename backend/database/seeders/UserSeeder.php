<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Lucas Albuquerque',
            'email' => 'exemplo@dominio.com',
            'password' => Hash::make('123456'),
        ]);
        User::create([
            'name' => 'Igor Gavio',
            'email' => 'exemplo2@dominio.com',
            'password' => Hash::make('123456'),
        ]);

    }
}
