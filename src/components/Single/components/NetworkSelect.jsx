import React from "react";
import "./SalesInput.css"; // Ensure to import the CSS file

const NetworkSelect = ({ selectedNetwork, handleNetworkChange }) => {
  return (
    <div className="input-sales mb-3">
      <p className="small-text guide">Select a network to calculate</p>
      <div className="input-group">
        <select
          className="form-select mb-3"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
          value={selectedNetwork}
          onChange={(e) => handleNetworkChange(e.target.value)}
        >
          <option value="">Select Network</option>
          <option value="MTN">MTN</option>
          <option value="AirtelTigo">AirtelTigo</option>
          <option value="Vodafone">Vodafone</option>
        </select>
      </div>
    </div>
  );
};

export default NetworkSelect;
