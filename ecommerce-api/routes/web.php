<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Admin\OrderAdminController;

Route::get('/', function () {
    return view('welcome');
});

// admin panel ke sare routes /admin se start honge
Route::prefix('admin')->group(function () {
    Route::resource('products', ProductAdminController::class);
    Route::get('/orders', [OrderAdminController::class, 'index'])->name('admin.orders.index');
    Route::patch('/orders/{order}/accept', [OrderAdminController::class, 'accept'])->name('admin.orders.accept');
    Route::patch('/orders/{order}/deny', [OrderAdminController::class, 'deny'])->name('admin.orders.deny');
});