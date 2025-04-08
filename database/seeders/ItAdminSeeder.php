<?php

namespace Database\Seeders;

use App\Models\IT\ItStaff;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class ItAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ItStaff::create([
            'name' => 'Sanjay Kapri',
            'email' => 'it@getmyapproval.com',
            'phone' => '9988774455',
            'password' => Hash::make('password'), // Hash password
            'role' => 'admin',
            'it_designation_id' => null, // Simulate a related ID
            'file_path' => null,
            'profile_image' => null,
            'parent_staff_id' => null,
            'status' => '1', // Stored as a string because it's a string column
        ]);
    }
}
