<?php

namespace Database\Seeders;

use App\Models\ItStaff;
use App\Models\OP\OpStaff;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        // Permission::create(['name' => 'add staff', 'guard_name' => 'itstaff']);
        // Permission::create(['name' => 'edit staff', 'guard_name' => 'itstaff']);
        // Permission::create(['name' => 'delete staff', 'guard_name' => 'itstaff']);

        // Permission::create(['name' => 'add roles', 'guard_name' => 'itstaff']);
        // Permission::create(['name' => 'edit roles', 'guard_name' => 'itstaff']);
        // Permission::create(['name' => 'delete roles', 'guard_name' => 'itstaff']);


        // create permissions
        // Permission::create(['name' => 'add staff', 'guard_name' => 'opstaff']);
        // Permission::create(['name' => 'edit staff', 'guard_name' => 'opstaff']);
        // Permission::create(['name' => 'delete staff', 'guard_name' => 'opstaff']);

        // Permission::create(['name' => 'add roles', 'guard_name' => 'opstaff']);
        // Permission::create(['name' => 'edit roles', 'guard_name' => 'opstaff']);
        // Permission::create(['name' => 'delete roles', 'guard_name' => 'opstaff']);


        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::create(['name' => 'op_super_admin', 'guard_name' => 'opstaff']);
        $role->givePermissionTo(Permission::where('guard_name', 'opstaff')->get());

        // $itAdmin = OpStaff::first();
        // $itAdmin->assignRole('it_super_admin');
    }
}
