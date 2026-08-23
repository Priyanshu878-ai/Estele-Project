<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Admin\OrderAdminController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('products', ProductAdminController::class);
    Route::get('/orders', [OrderAdminController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}/accept', [OrderAdminController::class, 'accept'])->name('orders.accept');
    Route::patch('/orders/{order}/deny', [OrderAdminController::class, 'deny'])->name('orders.deny');
});