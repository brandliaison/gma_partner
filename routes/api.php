<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::post('register-service-partner', [HomeController::class, 'registerServicePartner']);
Route::post('resend-service-partner-otp', [HomeController::class, 'resendServicePartnerOtp']);
Route::post('verify-service-partner-otp', [HomeController::class, 'verifyServicePartnerOtp']);
Route::get('get-service-partner/{id}', [HomeController::class, 'getServicePartner']);
Route::post('service-partner-details-save', [HomeController::class, 'servicePartnerDetailsSave']);

Route::post('register-channel-partner', [HomeController::class, 'registerChannelPartner']);
Route::post('resend-channel-partner-otp', [HomeController::class, 'resendChannelPartnerOtp']);
Route::post('verify-channel-partner-otp', [HomeController::class, 'verifyChannelPartnerOtp']);
Route::get('get-channel-partner/{id}', [HomeController::class, 'getChannelPartner']);
Route::post('channel-partner-details-save', [HomeController::class, 'channelPartnerDetailsSave']);

// IT Staff APIs
require('api_it.php');
require('api_op.php');
require('api_partner.php');
