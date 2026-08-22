import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import api from '../services/api';

function Landing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products').then((res) => {
            setProducts(res.data.slice(0, 3));
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6F1]">
            <Navbar />

            <div className="text-center py-24 px-6 bg-gradient-to-b from-[#F3E9DD] to-[#FAF6F1]">
                <p className="text-[#C9A227] tracking-[0.3em] text-xs mb-4 uppercase">Since 1989</p>
                <h1 className="font-display text-4xl md:text-6xl text-[#2B2320] mb-4">
                    Timeless Jewellery,<br />Made for You
                </h1>
                <p className="text-[#8A7B6E] max-w-md mx-auto mb-8">
                    Handcrafted pieces designed to make every moment shine a little brighter.
                </p>
            </div>

            <div className="py-20 px-6 flex-1">
                <p className="text-[#C9A227] tracking-[0.3em] text-xs mb-2 uppercase text-center">Featured</p>
                <h2 className="font-display text-3xl text-[#2B2320] mb-10 text-center">This Season's Picks</h2>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                                    <div className="aspect-square bg-[#F3E9DD] overflow-hidden">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#C9A227] font-display text-lg text-center px-4">
                                                {product.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 text-left">
                                        <h3 className="font-display text-lg text-[#2B2320]">{product.name}</h3>
                                        <p className="text-[#7A2E3D] font-medium mt-1">₹{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-[#E8DFD3] py-10 px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-[#8A7B6E]">
                <span>✦ Anti-Tarnish Finish</span>
                <span>✦ 7-Day Returns</span>
                <span>✦ Free Shipping</span>
                <span>✦ 1-Year Warranty</span>
            </div>

            <Footer />
        </div>
    );
}

export default Landing;