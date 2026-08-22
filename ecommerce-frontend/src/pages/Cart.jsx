import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

function Cart() {
    const { items, removeFromCart } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
                <Navbar />
                <div className="text-center py-24 flex-1">
                    <p className="text-4xl mb-4">🛍️</p>
                    <p className="text-[#8A7B6E] mb-4">Your cart is empty.</p>
                    <Link to="/" className="text-[#7A2E3D] underline">Browse our collection</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
            <Navbar />
            <div className="max-w-xl mx-auto px-6 py-16 flex-1 w-full">
                <h1 className="font-display text-3xl text-[#2B2320] mb-8">Your Cart</h1>

                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.product.id} className="bg-white rounded-2xl p-5 flex gap-5 items-center shadow-sm">
                            <div className="w-24 h-24 bg-[#F3E9DD] rounded-xl overflow-hidden shrink-0">
                                {item.product.image ? (
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-[#C9A227] text-center px-1">
                                        {item.product.name}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display text-lg text-[#2B2320]">{item.product.name}</h3>
                                <p className="text-sm text-[#8A7B6E]">Qty: {item.quantity} × ₹{item.product.price}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-sm text-[#8A7B6E] hover:text-[#7A2E3D] underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#E8DFD3]">
                    <span className="text-[#8A7B6E]">Total</span>
                    <span className="font-display text-2xl text-[#7A2E3D]">₹{total}</span>
                </div>

                <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#7A2E3D] text-white py-3 rounded-full mt-8 hover:bg-[#5f2530] transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;