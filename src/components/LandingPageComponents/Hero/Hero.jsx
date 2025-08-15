import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaCloudUploadAlt, FaShareAlt } from 'react-icons/fa';
import './Hero.css'

const Hero = () => {

    const navigate = useNavigate('');

    const scrollToFeatures = () => {
        const section = document.getElementById('features-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='hero-container'>
            <div className='hero-text'>
                <p className='hero-tagline'>📊 Your Data. Your Story.</p>
                <h1>Turn Your Data into Stunning Charts</h1>
                <p>Create, save, and share your charts in seconds — no coding needed.</p>

                <div className='hero-features'>
                    <div><FaChartBar /> Customizable Charts</div>
                    <div><FaCloudUploadAlt /> Cloud Storage</div>
                    <div><FaShareAlt /> Easy Sharing</div>
                </div>

                <div className='hero-buttons'>
                    <button
                        onClick={() => navigate('/signup')}
                        className='cta-btn'
                    >
                        Get Started
                    </button>
                    <button
                        onClick={scrollToFeatures}
                        className='secondary-btn'
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero