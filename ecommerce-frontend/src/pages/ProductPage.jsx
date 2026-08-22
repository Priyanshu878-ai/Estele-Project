import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import api from '../services/api';
import { useCart } from '../context/CartContext';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(null);
        api.get(`/products/${id}`).then((res) => setProduct(res.data));
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
            <Navbar />

            {!product ? (
                <Spinner />
            ) : (
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-16 flex-1">
                    <div className="aspect-square bg-[#F3E9DD] rounded-2xl overflow-hidden">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#C9A227] font-display text-2xl">
                                {product.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="font-display text-3xl text-[#2B2320] mb-3">{product.name}</h1>
                        <p className="text-[#8A7B6E] mb-4 leading-relaxed">{product.description}</p>
                        <p className="text-2xl text-[#7A2E3D] font-medium mb-6">₹{product.price}</p>

                        <div className="mb-8">
                            <label className="text-sm text-[#8A7B6E] block mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 border border-[#E8DFD3] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-[#7A2E3D]"
                            />
                            <span className="text-xs text-[#8A7B6E] ml-3">{product.stock} in stock</span>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={handleAddToCart} className="border border-[#7A2E3D] text-[#7A2E3D] px-6 py-3 rounded-full hover:bg-[#7A2E3D] hover:text-white transition-colors">
                                Add to Cart
                            </button>
                            <button onClick={handleBuyNow} className="bg-[#7A2E3D] text-white px-6 py-3 rounded-full hover:bg-[#5f2530] transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default ProductPage;