import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
    const { user, logout } = useAuth();
    const { totalQuantity } = useCart();

    return (
        <nav className="sticky top-0 z-50 bg-[#FAF6F1]/95 backdrop-blur-sm border-b border-[#E8DFD3] px-6 md:px-10 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-2xl tracking-wide text-[#2B2320]">
                Estele
            </Link>

            <div className="flex items-center gap-6 text-sm text-[#2B2320]">
                <Link to="/cart" className="flex items-center gap-1 hover:text-[#7A2E3D] transition-colors">
                    <span>Cart</span>
                    {totalQuantity > 0 && (
                        <span className="bg-[#7A2E3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {totalQuantity}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-[#8A7B6E]">Hi, {user.name}</span>
                        <button
                            onClick={logout}
                            className="border border-[#7A2E3D] text-[#7A2E3D] px-4 py-1.5 rounded-full hover:bg-[#7A2E3D] hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hover:text-[#7A2E3D] transition-colors">Login</Link>
                        <Link
                            to="/register"
                            className="bg-[#7A2E3D] text-white px-4 py-1.5 rounded-full hover:bg-[#5f2530] transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;