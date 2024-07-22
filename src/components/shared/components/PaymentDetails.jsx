import React, { useState } from "react";
import copyIcon from "../../../assets/copy.png";
import "./PaymentDetails.css";

const PaymentDetails = ({ serverDetails }) => {
  const [isCopied, setIsCopied] = useState(false);
  const phoneNumberHashing = (phone) => {
    return `+233*******${phone.slice(-2)}`;
  };

  const copyMomoNumber = () => {
    navigator.clipboard
      .writeText(serverDetails.number)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => console.error("Copy failed!", err));
  };

  return (
    <div className="payment">
      <p className="payment-details">
        Make payment to
        <br />
        Momo name: {serverDetails.momoName}
        <br />
        Momo number: {phoneNumberHashing(serverDetails.number)}
      </p>
      {!isCopied && (
        <button className="copy" onClick={copyMomoNumber}>
          <img src={copyIcon} alt="copy icon" />
          <span>Copy</span>
        </button>
      )}
      {isCopied && <p className="copied">Momo Number Copied!</p>}
    </div>
  );
};

export default PaymentDetails;
