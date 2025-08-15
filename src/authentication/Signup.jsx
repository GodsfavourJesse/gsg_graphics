import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import useAuthFormValidation from '../hooks/useAuthFormValidation';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

export default function Signup() {
    const { 
        email, password, emailError, passwordError, touched, setTouched,
        passwordStrength, getStrengthColor, getStrengthText, isStrong,
        handleEmailChange, handlePasswordChange, isFormValid 
    } = useAuthFormValidation();

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext); // <-- use login function
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save minimal user info to localStorage
            localStorage.setItem('user', JSON.stringify({ email: user.email, uid: user.uid }));

            login({ email: user.email, uid: user.uid }); // <-- update context

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async () => {
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
                <h2>Create Your Account</h2>
                <p className="auth-subtitle">Sign up to start creating and saving charts.</p>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                        required
                        className={touched.email && emailError ? 'input-error' : ''}
                    />
                    {touched.email && emailError && <p className="validation-error">{emailError}</p>}

                    <div className='password-box'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value.slice(0, 15))}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            required
                            className={touched.password && passwordError ? 'input-error' : ''}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="hide-btn"
                        >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                    </div>

                    {touched.password && password && (
                        <div className="password-strength-bar">
                            <div
                                className={`password-strength-fill ${isStrong ? 'strong-glow' : ''}`}
                                style={{
                                    width: `${passwordStrength}%`,
                                    background: getStrengthColor(),
                                }}
                            >
                                <span className="strength-text">{getStrengthText()}</span>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="primary-btn" disabled={!isFormValid}>
                        Sign Up
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button className="google-btn" onClick={handleGoogleSignup}>
                    <FcGoogle size={20} /> Continue with Google
                </button>

                <p className="switch-auth">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}
