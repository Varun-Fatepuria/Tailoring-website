import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/HomePage.css"; 

const HomePage = () => {
  const images = [
    "/images/shop.jpg",
    "/images/sewing2.jpg",
    "/images/fabrics.jpg",
    "/images/shop2.jpg",
    "/images/bobbins.jpg",
    "/images/cutting.jpg",
  ];

  return (
    <div className="container homepage">
      {/* Slider Section */}
      <div className="slider-container">
        <motion.div
          className="slider"
          animate={{ x: ["0%", "-100%"] }} // Move images from right to left
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Continuous smooth movement
        >
          {images.concat(images).map((img, index) => (
            <img key={index} src={img} alt="Tailoring Service" className="slider-image" />
          ))}
        </motion.div>
      </div>
      <div className="intro">
        <h2>Welcome to BRish Tailors</h2>
        <p>
          Experience the fusion of modern design and traditional craftsmanship. Our interactive platform lets you customize your apparel with precision.
        </p>
        <Link to="/customizer">
          <button className="cta-button">Customize Your Apparel Now</button>
        </Link>
      </div>
      <div className="features">
        <h3>Our Services</h3>
        <div className="feature-cards">
          <div className="card">
            <img src="/images/fabric-selection.avif" alt="High Quality Materials" />
            <h4>High Quality Materials</h4>
            <p>We source only the finest fabrics to ensure lasting comfort and style.</p>
          </div>
          <div className="card">
            <img src="/images/stitch.jpg" alt="Tailor Made" />
            <h4>Tailor Made</h4>
            <p>Every piece is crafted with precision to match your unique measurements.</p>
          </div>
          <div className="card">
            <img src="/images/parcel.jpg" alt="Fast Service" />
            <h4>Fast Service</h4>
            <p>Get your orders delivered promptly with our efficient process and dedicated team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
