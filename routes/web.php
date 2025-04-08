<?php

use Illuminate\Support\Facades\Route;

// CMS Routes IT
Route::get('/it-admin/{path?}', function () {
    return view('itstaff'); // Your cms React view file
})->where('path', '.*');


// CMS Routes OP
Route::get('/op-admin/{path?}', function () {
    return view('operations'); // Your cms React view file
})->where('path', '.*');


// Service Parnert
Route::get('/service-partner/{path?}', function () {
    return view('servicePartner'); // Your cms React view file
})->where('path', '.*');

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
