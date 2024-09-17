import React from "react";
import "./styles.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__spinner">
        <div className="loading-screen__bubble_1"></div>
        <div className="loading-screen__bubble_2"></div>
      </div>
      <div className="loading-screen__text"></div>
    </div>
  );
};

export default LoadingScreen;
