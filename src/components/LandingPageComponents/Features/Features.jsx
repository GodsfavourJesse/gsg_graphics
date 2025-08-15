import React, { useEffect, useRef } from 'react';
import { FaChartLine, FaCloud, FaShareAlt, FaLock, FaMobileAlt, FaSyncAlt } from 'react-icons/fa';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: <FaChartLine />,
            title: 'Customizable Charts',
            desc: 'Choose from multiple chart types and styles to match your data and brand.'
        },
        {
            icon: <FaCloud />,
            title: 'Cloud Storage',
            desc: 'Your charts are saved securely in the cloud, accessible from anywhere.'
        },
        {
            icon: <FaShareAlt />,
            title: 'Easy Sharing',
            desc: 'Share your charts via link or download them in high-quality formats.'
        },
        {
            icon: <FaLock />,
            title: 'Data Security',
            desc: 'We prioritize your privacy with secure authentication and encrypted storage.'
        },
        {
            icon: <FaMobileAlt />,
            title: 'Mobile Friendly',
            desc: 'Fully responsive design so you can create and view charts on any device.'
        },
        {
            icon: <FaSyncAlt />,
            title: 'Real-Time Updates',
            desc: 'Your charts refresh instantly when your data changes—no manual reloads needed.'
        }
    ];

    const featuresRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        featuresRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div id="features-section" className="features-container">
            <h2>Why Choose Our Platform?</h2>
            <p className="features-subtext">
                Everything you need to turn your data into insights, all in one place.
            </p>

            <div className="features-grid">
                {features.map((feat, index) => (
                    <div 
                        className={`feature-card fade-up delay-${index + 1}`} 
                        key={index}
                        ref={(el) => (featuresRef.current[index] = el)}
                    >
                        <div className="feature-icon">{feat.icon}</div>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
