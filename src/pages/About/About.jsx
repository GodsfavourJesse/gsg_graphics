import React from "react";
import { motion } from "framer-motion";
import { FaChartPie, FaPaintBrush, FaLaptopCode, FaUsers } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./About.css";

const About = () => {
    const highlights = [
        {
            icon: <FaPaintBrush />,
            title: "Creative Design Excellence",
            desc: "At GSQ Graphics, we bring ideas to life with powerful visuals that inspire, educate, and attract. Our designs are more than art — they’re strategy-driven."
        },
        {
            icon: <FaChartPie />,
            title: "Advanced Data Visualization",
            desc: "Our charting system converts complex data into interactive, presentation-ready visuals — empowering creators, students, and businesses alike."
        },
        {
            icon: <FaLaptopCode />,
            title: "Tech Meets Art",
            desc: "We combine the power of technology and design to build seamless tools that help users create charts, posters, and digital content effortlessly."
        },
        {
            icon: <FaUsers />,
            title: "Community & Collaboration",
            desc: "GSQ Graphics fosters a growing community of creatives who learn, build, and grow together through innovation and shared creativity."
        },
    ];

    return (
        <section id="about" className="about-section">
            <motion.div
                className="about-header"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h1>About <span>GSQ Graphics</span></h1>
                <p className="about-subtext">
                    Where <strong>ata meets creativity</strong> — GSQ Graphics stands at the intersection of design and innovation.  
                    We’re not just a charting platform — we’re a <strong>graphics design powerhouse</strong>, dedicated to helping individuals 
                    and organizations express their ideas visually and intelligently.
                </p>
            </motion.div>

            <div className="about-container">
                {/* Left Side - Image */}
                <motion.div
                    className="about-image"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="image-wrapper">
                        <img src={assets.gsq_graphics_logo} alt="GSQ Graphics Logo" />
                        <div className="image-glow"></div>
                    </div>
                </motion.div>

                {/* Right Side - Text */}
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p>
                        GSQ Graphics is an innovative design and data visualization brand that
                        empowers users to create professional visuals — from stunning posters 
                        to fully customizable charts. Our platform blends art and analytics, 
                        giving users complete freedom to design with precision and creativity.
                    </p>
                    <p>
                        Founded by passionate designers and developers, GSQ Graphics strives to redefine
                        how visuals impact communication in the digital era. Whether you're a student, 
                        entrepreneur, or designer, our tools simplify creativity — one chart at a time.
                    </p>
                    <div className="signature">— The GSQ Graphics Team</div>
                </motion.div>
            </div>

            {/* Highlights Section */}
            <div className="about-features">
                {highlights.map((feat, index) => (
                    <motion.div
                        key={index}
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="icon">{feat.icon}</div>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default About;
