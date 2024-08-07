<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@practica.local')->exists()) {
            $user = new User();
            $user->name = 'Admin';
            $user->email = 'admin@practica.local';
            $user->password = Hash::make('parola');
            $user->save();
        }
    }
}
