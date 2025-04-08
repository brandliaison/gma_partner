<?php

use App\Http\Controllers\ItStaff\AuthController;
use App\Http\Controllers\ItStaff\DesginationController;
use App\Http\Controllers\ItStaff\PageManagementController;
use App\Http\Controllers\ItStaff\PageSectionController;
use App\Http\Controllers\ItStaff\RolesController;
use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\ItStaff\WebsiteSettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/it-admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(['auth:itstaff'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

        // IT designation
        Route::apiResource('designation', DesginationController::class);

        // IT Staff
        Route::apiResource('it-staff', StaffController::class);

        // Website Settings
        Route::apiResource('website-setting', WebsiteSettingsController::class);

        // Roles and Permissions
        Route::apiResource('roles', RolesController::class);
        Route::get('permissions', [RolesController::class, 'permissions']);
        Route::get('permissions-by-role/{id}', [RolesController::class, 'permissionsByRole']);
        Route::post('create-permissions', [RolesController::class, 'createPermissions']);
        Route::post('assign-permissions', [RolesController::class, 'assignPermissions']);
        Route::apiResource('pages', PageManagementController::class);
        Route::apiResource('page-sections', PageSectionController::class);
    });
});
