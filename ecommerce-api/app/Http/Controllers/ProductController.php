<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // sare products ki list bhejni h, React ka landing page isi ko call karega
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // ek single product ka detail bhejna h (product page ke liye)
    public function show(Product $product)
    {
        return response()->json($product);
    }

    // naya product add karna h (admin panel se use hoga)
    public function store(Request $request)
    {
        // pehle check kr lete h ki data sahi format me aaya h ya nahi
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'stock' => 'required|integer',
        ]);

        // ab isi validated data se product bana denge
        $product = Product::create($validated);

        return response()->json($product, 201); // 201 matlab "cheez create ho gyi"
    }

    // product ko modify (update) karna h
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'stock' => 'required|integer',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    // product delete karna h
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}