import { useState } from 'react';

export default function useAuthFormValidation() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0); // 0-100
    const [touched, setTouched] = useState({ email: false, password: false });

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(regex.test(value) ? '' : 'Please enter a valid email address.');
    };

    const validatePassword = (value) => {
        let strength = 0;
        if (value.length >= 6) strength += 30;
        if (/[A-Z]/.test(value)) strength += 20;
        if (/[0-9]/.test(value)) strength += 20;
        if (/[^A-Za-z0-9]/.test(value)) strength += 30;

        setPasswordStrength(strength);

        setPasswordError(value.length < 6 ? 'Password must be at least 6 characters.' : '');
    };

    const getPasswordStrength = (value) => {
        // Cap input to 15 characters
        if (value.length > 15) value = value.slice(0, 15);

        let strength = value.length; // 1 point per character
        if (/[A-Z]/.test(value)) strength += 1;
        if (/[0-9]/.test(value)) strength += 1;
        if (/[^A-Za-z0-9]/.test(value)) strength += 1;

        return strength; // numeric strength value  
    };


    const getStrengthColor = () => {
        if (passwordStrength < 5) return 'linear-gradient(90deg, #e63946, #f77f00)';
        else if (passwordStrength <= 10) return 'linear-gradient(90deg, #f4a261, #fcdc4d)';
        else return 'linear-gradient(90deg, #2a9d8f, #4cc9f0)';
    };

    const getStrengthText = () => {
        if (passwordStrength < 5) return 'Low';
        else if (passwordStrength <= 10) return 'Medium';
        else return 'High';
    };

    const isStrong = passwordStrength >= 10;

    const handleEmailChange = (value) => {
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
    };

    return {
        email,
        password,
        emailError,
        passwordError,
        passwordStrength,
        touched,
        setTouched,
        handleEmailChange,
        handlePasswordChange,
        getStrengthColor,
        getStrengthText,
        isStrong,
        isFormValid: !emailError && !passwordError && email && password,
    };
}
