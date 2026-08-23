@extends('layouts.app')
@section('title', 'Orders')

@section('content')
    <h2 class="mb-4">Orders</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered bg-white">
        <thead class="table-dark">
            <tr>
                <th>Customer</th><th>Product</th><th>Qty</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($orders as $order)
            <tr>
                <td>{{ $order->user->name }}</td>
                <td>{{ $order->product->name }}</td>
                <td>{{ $order->quantity }}</td>
                <td>₹{{ $order->total_price }}</td>
                <td>
                    <span class="badge {{ $order->payment_status === 'paid' ? 'bg-success' : 'bg-secondary' }}">
                        {{ $order->payment_status }}
                    </span>
                </td>
                <td>
                    <span class="badge
                        @if($order->status === 'pending') bg-warning text-dark
                        @elseif($order->status === 'accepted') bg-success
                        @else bg-danger @endif">
                        {{ ucfirst($order->status) }}
                    </span>
                </td>
                <td>
                    @if($order->status === 'pending')
                    <form action="{{ route('admin.orders.accept', $order->id) }}" method="POST" class="d-inline">
                        @csrf @method('PATCH')
                        <button type="submit" class="btn btn-sm btn-success">Accept</button>
                    </form>
                    <form action="{{ route('admin.orders.deny', $order->id) }}" method="POST" class="d-inline">
                        @csrf @method('PATCH')
                        <button type="submit" class="btn btn-sm btn-danger">Deny</button>
                    </form>
                    @else
                        <span class="text-muted">—</span>
                    @endif
                </td>
            </tr>
            @empty
            <tr><td colspan="7" class="text-center text-muted">No orders yet.</td></tr>
            @endforelse
        </tbody>
    </table>
@endsection