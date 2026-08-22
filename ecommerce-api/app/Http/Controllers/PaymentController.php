<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    // razorpay ko bolenge ek order bana do, jitne ka payment krwana h
    public function createOrder(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
        ]);

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        // razorpay paise "paise" (rupee ka 100th part) me leta h, isliye 100 se multiply krna h
        $razorpayOrder = $api->order->create([
            'receipt' => 'order_' . time(),
            'amount' => $request->amount * 100,
            'currency' => 'INR',
        ]);

        return response()->json([
            'order_id' => $razorpayOrder['id'],
            'amount' => $razorpayOrder['amount'],
            'key' => config('services.razorpay.key'),
        ]);
    }

    // payment hone ke baad, confirm krenge ki ye genuine payment h
    public function verifyPayment(Request $request)
    {
        $request->validate([
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        try {
            // razorpay ka apna function h jo signature check krke bta deta h payment sahi h ya fake
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ]);

            return response()->json(['verified' => true]);
        } catch (\Exception $e) {
            return response()->json(['verified' => false, 'message' => 'Payment verification failed'], 400);
        }
    }
}