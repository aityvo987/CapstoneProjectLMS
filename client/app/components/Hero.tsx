'use client'

import React from "react";

interface Props {}

const HeroSection: React.FC<Props> = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="content">
          <h1>Improve Your Online Learning Experience Better Instantly</h1>
          <p>
            We have 40k+ online courses & 500k+ online registered students. Find
            your desired courses from them.
          </p>
          <div className="search-bar">
            <input type="text" placeholder="Search Courses..." />
            <button type="submit">🔍</button>
          </div>
          <div className="trusted-info">
            <span>500K+ People already trusted us.</span>
            <a href="#courses">View Courses</a>
          </div>
        </div>
        <div className="image-container">
          <img
            src="/path-to-your-image.png"
            alt="Illustration of a woman working on a laptop"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
