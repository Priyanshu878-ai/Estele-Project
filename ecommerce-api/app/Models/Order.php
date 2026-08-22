<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'product_id', 'quantity', 'total_price', 'status', 'payment_id', 'payment_status'];

    // Ek Order kis User ka hai
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Ek Order kis Product ka hai
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
