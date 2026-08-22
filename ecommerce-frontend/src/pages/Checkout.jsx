import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Checkout() {
    const { items, clearCart } = useCart();
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
                <Navbar />
                <p className="text-center py-24 text-[#8A7B6E] flex-1">Please login to checkout.</p>
                <Footer />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
                <Navbar />
                <p className="text-center py-24 text-[#8A7B6E] flex-1">Your cart is empty.</p>
                <Footer />
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handlePayment = async () => {
        const { data } = await api.post('/payment/create-order', { amount: total });

        const options = {
            key: data.key,
            amount: data.amount,
            currency: 'INR',
            name: 'Estele',
            description: `${items.length} item(s)`,
            order_id: data.order_id,
            handler: async function (response) {
                const verifyRes = await api.post('/payment/verify', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyRes.data.verified) {
                    for (const item of items) {
                        await api.post('/orders', {
                            product_id: item.product.id,
                            quantity: item.quantity,
                            payment_id: response.razorpay_payment_id,
                        });
                    }
                    alert('Order placed successfully!');
                    clearCart();
                } else {
                    alert('Payment verification failed.');
                }
            },
            prefill: { name: user.name, email: user.email },
            theme: { color: '#7A2E3D' },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
            <Navbar />
            <div className="max-w-sm mx-auto px-6 py-20 flex-1 w-full">
                <h1 className="font-display text-3xl text-[#2B2320] mb-8">Checkout</h1>

                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-2">
                    {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#F3E9DD] rounded-lg overflow-hidden shrink-0">
                                {item.product.image && (
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <p className="text-[#2B2320] text-sm">{item.product.name} × {item.quantity}</p>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#E8DFD3]">
                        <span className="text-[#8A7B6E]">Total</span>
                        <span className="font-display text-xl text-[#7A2E3D]">₹{total}</span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-[#7A2E3D] text-white py-3 rounded-full hover:bg-[#5f2530] transition-colors"
                >
                    Order Now
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;