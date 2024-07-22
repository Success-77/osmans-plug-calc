import React from "react";
import AllCalculator from "./AllCalculator";
import {
  mtnPrices,
  atPrices,
  vodaPrices,
} from "../..//shared/utilities/Prices"; // Import prices from the shared file

const CalculateAll = () => {
  return (
    <div>
      <AllCalculator
        mtnPrices={mtnPrices}
        atPrices={atPrices}
        vodaPrices={vodaPrices}
      />
    </div>
  );
};

export default CalculateAll;
