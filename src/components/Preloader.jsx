import React from "react";
import logoVS from "../assets/logovidyasetu.jpg";
import "../styles/Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src={logoVS} alt="Vidya Setu Logo" className="preloader-logo-centered" />
        <h1 className="preloader-title">Vidya Setu</h1>
        <p className="preloader-subtitle">
          Where Education Meets Innovation
        </p>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
