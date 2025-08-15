import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext); // <-- use login function
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save minimal user info to localStorage
            localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }));

            login({ email: user.email, uid: user.uid }); // <-- update context

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Save minimal user info to localStorage
            localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }));

            login({ email: user.email, uid: user.uid }); // <-- update context

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Log In</h2>
                <p className="auth-subtitle">Welcome back! Please enter your details.</p>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className='password-box'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="hide-btn"
                        >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>

                    <button type="submit" className="primary-btn">
                        Log In
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    <FcGoogle size={20} /> Continue with Google
                </button>

                <p className="switch-auth">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
