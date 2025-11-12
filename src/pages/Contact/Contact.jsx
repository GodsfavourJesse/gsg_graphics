import React from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {

    return (
        <section className="gsq-contact">
            <motion.div
                className="contact-header"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1>Let’s Connect</h1>
                <p>
                    Got a project idea, partnership request, or just want to say hi?
                    We’d love to hear from you.
                </p>
            </motion.div>   

            <div className="contact-card">
                <motion.div
                className="contact-left"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                >
                <h2>Reach Us Directly</h2>
                <p>
                    GSQ Graphics isn’t just about visuals — it’s a movement of creativity,
                    storytelling, and intelligent design. Our mission is to help brands,
                    creators, and innovators communicate visually with precision and beauty.
                </p>

                <div className="contact-links">
                    <div>
                        <FaEnvelope className="contact-icon" /> support@gsqgraphics.com
                    </div>
                    <div>
                        <FaPhoneAlt className="contact-icon" />
                        +234-903-868-8972
                    </div>
                </div>

                <div className="creative-hint">
                    <span>“Design meets data, art meets purpose.”</span>
                </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
