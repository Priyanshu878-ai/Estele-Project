<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;

// koi bhi dekh skta h products (login ki zarurat nahi)
Route::apiResource('products', ProductController::class)->only(['index', 'show']);

// register aur login khule (public) routes h
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ye sare routes sirf login hue user hi use kr skte h
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    // payment ke liye naye routes
    Route::post('/payment/create-order', [PaymentController::class, 'createOrder']);
    Route::post('/payment/verify', [PaymentController::class, 'verifyPayment']);
});