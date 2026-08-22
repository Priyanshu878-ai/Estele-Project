import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    const inputClass = "w-full border border-[#E8DFD3] rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#7A2E3D]";

    return (
        <div className="min-h-screen bg-[#FAF6F1]">
            <Navbar />
            <div className="max-w-sm mx-auto px-6 py-20">
                <h1 className="font-display text-3xl text-[#2B2320] mb-8 text-center">Welcome Back</h1>

                {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
                    <button type="submit" className="bg-[#7A2E3D] text-white py-3 rounded-full hover:bg-[#5f2530] transition-colors">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-[#8A7B6E] mt-6">
                    New here? <Link to="/register" className="text-[#7A2E3D] underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;