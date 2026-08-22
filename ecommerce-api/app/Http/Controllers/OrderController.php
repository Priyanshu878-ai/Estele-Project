<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // logged in user ke sare orders dikhane h (uski "my orders" screen ke liye)
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('product')->get();
        return response()->json($orders);
    }

    // naya order place karna h - ye tab call hoga jab payment ho chuki hogi
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'payment_id' => 'required|string',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // total price hum khud calculate karenge, frontend se trust nahi karenge
        // (koi bhi Postman se galat price bhej ke cheat kr skta h agr frontend pe depend kre)
        $totalPrice = $product->price * $validated['quantity'];

        $order = Order::create([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total_price' => $totalPrice,
            'payment_id' => $validated['payment_id'],
            'payment_status' => 'paid',
            'status' => 'pending',
        ]);

        return response()->json($order, 201);
    }

    // ek single order ka detail
    public function show(Order $order)
    {
        return response()->json($order->load('product', 'user'));
    }
}