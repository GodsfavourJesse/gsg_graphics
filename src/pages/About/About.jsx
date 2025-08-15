import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { assets } from '../../../assets/assets';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                
                {/* Text Side */}
                <motion.div 
                    className="about-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    <h2>About GSQ Graphics</h2>
                    <p>
                        GSQ Graphics is your all-in-one platform for transforming raw data 
                        into stunning, easy-to-read visualizations in seconds. Whether you’re 
                        preparing for a board meeting, sharing insights with your team, or 
                        creating an engaging presentation, we help you tell stories with data.
                    </p>
                    <p>
                        Our mission is simple: make data visualization accessible to everyone — 
                        no coding, no complex tools, just beautiful charts that speak for themselves.
                    </p>
                </motion.div>

                {/* Image Side */}
                <motion.div 
                    className="about-image"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <img 
                        src={assets.gsq_graphics_logo} 
                        alt="About GSQ Graphics"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default About;
