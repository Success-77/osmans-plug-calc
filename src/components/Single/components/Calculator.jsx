// Calculator.js

import React, { useState, useEffect, useMemo } from "react";
import copyIcon from "../../../assets/copy.png";
import TabularFormat from "../../shared/components/TabularFormat";
import PaymentDetails from "../../shared/components/PaymentDetails";
import SalesInput from "./SalesInput";
import NetworkSelect from "./NetworkSelect";
import "./Calculator.css";
import { mtnPrices, atPrices, vodaPrices } from "../../shared/utilities/Prices"; // Import prices from the shared file
import {
  gigFormatter,
  amounts,
  plainTextFormat,
} from "../../shared/utilities/formatters";
import { serverDetails } from "../../shared/utilities/payment";

const Calculator = ({ network }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(network);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
  };

  // const prices = useMemo(() => {
  //   switch (selectedNetwork) {
  //     case "MTN":
  //       setIsAvailable(true);
  //       return mtnPrices;
  //     case "AirtelTigo":
  //       setIsAvailable(false);
  //       return atPrices;
  //     case "Vodafone":
  //       setIsAvailable(false);
  //       return vodaPrices;
  //     default:
  //       return {};
  //   }
  // }, [selectedNetwork]);

  const prices = mtnPrices;
  useEffect(() => {
    const values = inputValue.split("+").map((value) => value.trim());
    const packs = gigFormatter(values);
    const pricesArray = amounts(prices, values);
    setTableContent(<TabularFormat packages={packs} prices={pricesArray} />);
  }, [inputValue, prices]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Invalid input!");
    }
  };

  const handleInputBlur = () => {
    if (inputError) {
      setInputError("");
    }
  };

  const handleCopyToClipboard = () => {
    if (inputValue) {
      const values = inputValue.split("+").map((value) => value.trim());
      const packs = gigFormatter(values);
      const pricesArray = amounts(prices, values);
      const plainTextLines = plainTextFormat(packs, pricesArray, serverDetails);
      const plainText = plainTextLines.join("\n");

      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="main-container">
      <div className="form">
        <div className="form-container">
          {/* <NetworkSelect
            selectedNetwork={selectedNetwork}
            handleNetworkChange={handleNetworkChange}
          /> */}
          <SalesInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            inputError={inputError}
            network={"MTN"}
            // disable={!isAvailable}
          />
        </div>
        <div className="packs-container">
          {/* {!isAvailable ? (
            <div className="coming-soon">
              <p>Coming soon...</p>
              <p>Stay tuned😎</p>
            </div>
          ) : ( */}
          <div>
            {tableContent}
            {!isCopied && (
              <button className="copy" onClick={handleCopyToClipboard}>
                <img src={copyIcon} alt="copy icon" />
                <span>Copy</span>
              </button>
            )}
            {isCopied && <p className="copied">copied!</p>}
          </div>
          {/* )} */}
        </div>
      </div>
      {/* <PaymentDetails serverDetails={serverDetails} /> */}
    </div>
  );
};

export default Calculator;
