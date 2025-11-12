import React, { useEffect, useRef } from "react";
import {
  FaChartBar,
  FaCloud,
  FaLock,
  FaShareAlt,
  FaMobileAlt,
  FaSyncAlt,
  FaCogs,
  FaPalette,
} from "react-icons/fa";
import "./Features.css";

const Features = () => {
  const featuresBox = [
    {
      icon: <FaChartBar />,
      title: "Dynamic Chart Generation",
      desc: "Create beautiful charts in real time — bar, pie, line, and more — using your custom datasets. Designed for simplicity and precision.",
    },
    {
      icon: <FaPalette />,
      title: "Modern Design System",
      desc: "Enjoy a clean and consistent UI powered by a professional color palette and adaptive theme support.",
    },
    {
      icon: <FaCloud />,
      title: "Secure Cloud Sync",
      desc: "Your data and charts are safely stored in the cloud, accessible anytime and anywhere you log in.",
    },
    {
      icon: <FaLock />,
      title: "Robust Data Security",
      desc: "With end-to-end encryption and secure authentication, your projects remain private and protected.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Fully Responsive Experience",
      desc: "Optimized for every device — from desktops to tablets and smartphones — without losing design quality.",
    },
    {
      icon: <FaSyncAlt />,
      title: "Real-Time Updates",
      desc: "Charts automatically refresh when data changes, ensuring your visuals always reflect the latest information.",
    },
    {
      icon: <FaCogs />,
      title: "User Personalization",
      desc: "Switch between light and dark themes, adjust chart styles, and personalize dashboard preferences easily.",
    },
    {
      icon: <FaShareAlt />,
      title: "Seamless Export & Sharing",
      desc: "Export charts in multiple formats or share them instantly with colleagues, clients, or classmates.",
    },
  ];

  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="features-page">
      <header className="features-header">
        <h1>Powerful Features, Seamlessly Integrated</h1>
        <p>
          <strong>GSQ Graphics</strong> combines performance, simplicity, and
          modern design — empowering users to turn raw data into clear visual
          insights with minimal effort.
        </p>
      </header>

      <div className="features-grid">
        {featuresBox.map((feature, index) => (
          <div
            className="feature-card fade-up"
            key={index}
            ref={(el) => (featureRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <footer className="features-footer">
        <p>
          Built with ❤️ by <strong>Schema World Technologies</strong> <br />
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Features;
