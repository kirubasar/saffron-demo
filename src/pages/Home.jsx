import React from 'react';
import '../App.css';

export default function Home() {
  return (
    <div className="main-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/saffron-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-section">
        <div className="container text-center">
          <h2 className="hero-title">Z PRINCESS SAFFRON</h2>
          <p className="hero-subtitle">WORLD'S FINEST SAFFRON</p>
          <button className="btn btn-light btn-lg px-5 rounded-pill text-uppercase">Discover Now</button>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"><div className="wheel"></div></div>
      </div>

      <section className="apart-section py-5">
        <div className="container py-5">
          <h2 className="section-title text-center mb-5">WHAT SET US APART</h2>
          <div className="row g-5">
            <div className="col-md-4"><div className="text-center"><h3 className="feature-title mb-4">TRANSPARENCY</h3><p className="feature-text text-muted">We Provide Detailed Information About The Origin And Processing Of Our Saffron, So You Know Exactly What You're Buying.</p></div></div>
            <div className="col-md-4"><div className="text-center"><h3 className="feature-title mb-4">INNOVATION</h3><p className="feature-text text-muted">We Continuously Explore New Ways To Enhance The Quality And Usability Of Our Saffron, Ensuring We Stay Ahead Of The Market.</p></div></div>
            <div className="col-md-4"><div className="text-center"><h3 className="feature-title mb-4">PASSION</h3><p className="feature-text text-muted">Our Passion For Saffron Drives Us To Maintain The Highest Standards And Share This Incredible Spice With The World.</p></div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

 