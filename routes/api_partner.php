<?php


use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\Operations\ServiceCategoryController;
use App\Http\Controllers\Operations\ServiceController;
use App\Http\Controllers\Operations\ServiceSectionsController;
use App\Http\Controllers\ServicePartner\AuthController;
use App\Http\Middleware\MultiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/partner-admin')->name('partner.')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(MultiAuthMiddleware::class)->group(function () {
        Route::post('/change-password', [StaffController::class, 'changePassword']);
        Route::post('/change-staff-password', [StaffController::class, 'changeStaffPassword']);
        Route::post('/change-staff-status', [StaffController::class, 'changeStaffStatus']);
    });


    Route::middleware(['auth:partner'])->group(function () {
        // Services
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('services-sections', ServiceSectionsController::class);
    });


    Route::get('active-service-categories', [ServiceCategoryController::class, 'activeServiceCategories']);
    Route::get('active-services', [ServiceController::class, 'activeServices']);
});
