<!DOCTYPE html>
<html>
<head>
    <title>@yield('title', 'Admin Panel')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <nav class="navbar navbar-dark bg-dark">
        <div class="container">
            <span class="navbar-brand">🛠 Admin Panel</span>
            <div>
                <a href="{{ route('products.index') }}" class="text-white me-3 text-decoration-none">Products</a>
                <a href="{{ route('admin.orders.index') }}" class="text-white text-decoration-none">Orders</a>
            </div>
        </div>
    </nav>
    <div class="container py-5">
        @yield('content')
    </div>
</body>
</html>