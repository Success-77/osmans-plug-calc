import React, { useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import MTN from "./MTN"; // Import the MTN component
import AT from "./AT"; // Import the AT component

const App = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const clickedButton = document.querySelector(
      `.tab-button[data-tab="${tab}"]`
    );
    if (clickedButton) {
      const tabsContainer = document.querySelector(".tabs");
      const homeHeader = document.querySelector(".home-header");
      clickedButton.classList.add("clicked");
      tabsContainer.classList.add("tab-clicked");
      homeHeader.classList.add("move-header");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <h3 className="home-header">Daily Sales Calculator</h3>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "MTN" ? "active" : ""}`}
          onClick={() => handleTabClick("MTN")}
          data-tab="MTN"
        >
          MTN
        </button>
        <button
          className={`tab-button ${activeTab === "AirtelTigo" ? "active" : ""}`}
          onClick={() => handleTabClick("AirtelTigo")}
          data-tab="AirtelTigo"
        >
          AirtelTigo
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "MTN" && <MTN />}
        {activeTab === "AirtelTigo" && <AT />}
      </div>
    </div>
  );
};

export default App;
