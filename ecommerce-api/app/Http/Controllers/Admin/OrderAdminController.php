<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderAdminController extends Controller
{
    // sare orders dikhane h, user aur product ki details ke sath
    public function index()
    {
        $orders = Order::with('user', 'product')->latest()->get();
        return view('admin.orders.index', compact('orders'));
    }

    // order accept krna h
    public function accept(Order $order)
    {
        $order->update(['status' => 'accepted']);
        return redirect()->route('admin.orders.index')->with('success', 'Order accepted.');
    }

    // order deny krna h
    public function deny(Order $order)
    {
        $order->update(['status' => 'denied']);
        return redirect()->route('admin.orders.index')->with('success', 'Order denied.');
    }
}