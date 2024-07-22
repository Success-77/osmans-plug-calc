import React, { useState, useEffect } from "react";
import copyIcon from "../../../assets/images/copy.png";
import {
  gigFormatter,
  amounts,
  replaceUndefinedWithQuestionMark,
} from "../../shared/utilities/formatters";
import PaymentDetails from "../../shared/components/PaymentDetails";
import { serverDetails } from "../../shared/utilities/payment";
import AllInput from "./AllInput";

const AllCalculator = ({ mtnPrices, atPrices, vodaPrices }) => {
  const [mtnInputValue, setMTNInputValue] = useState("");
  const [atInputValue, setATInputValue] = useState("");
  const [vodaInputValue, setVodaInputValue] = useState("");
  const [mtnInputError, setMTNInputError] = useState("");
  const [atInputError, setATInputError] = useState("");
  const [vodaInputError, setVodaInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const parseInputValues = (input) =>
      input.split(/[\s+]+/).map((value) => value.trim());
    const mtnValues = parseInputValues(mtnInputValue);
    const atValues = parseInputValues(atInputValue);
    const vodaValues = parseInputValues(vodaInputValue);

    const combinedValues = [...mtnValues, ...atValues, ...vodaValues];
    const packs = gigFormatter(combinedValues);
    const mtnPriceList = amounts(mtnPrices, mtnValues);
    const atPriceList = amounts(atPrices, atValues);
    const vodaPriceList = amounts(vodaPrices, vodaValues);
    const allPrices = [...mtnPriceList, ...atPriceList, ...vodaPriceList];

    const formattedTable = tabularFormat(packs, allPrices);
    setTableContent(formattedTable);
  }, [
    mtnInputValue,
    atInputValue,
    vodaInputValue,
    mtnPrices,
    atPrices,
    vodaPrices,
  ]);

  const handleInputChange = (value, setValue, setError) => {
    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(value)) {
      setValue(value);
      setError("");
    } else {
      setError("Invalid input!");
    }
  };

  const handleInputBlur = (setError) => {
    setError("");
  };

  const handleCopyToClipboard = () => {
    const parseInputValues = (input) =>
      input.split(/[\s+]+/).map((value) => value.trim());
    const mtnValues = parseInputValues(mtnInputValue);
    const atValues = parseInputValues(atInputValue);
    const vodaValues = parseInputValues(vodaInputValue);

    const combinedValues = [...mtnValues, ...atValues, ...vodaValues];
    const packs = gigFormatter(combinedValues);
    const mtnPriceList = amounts(mtnPrices, mtnValues);
    const atPriceList = amounts(atPrices, atValues);
    const vodaPriceList = amounts(vodaPrices, vodaValues);
    const allPrices = [...mtnPriceList, ...atPriceList, ...vodaPriceList];

    const plainTextLines = plainTextFormat(packs, allPrices);
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
  };

  const tabularFormat = (packages, allPrices) => {
    const replacedPrices = replaceUndefinedWithQuestionMark(allPrices.slice());
    const numericPrices = replacedPrices.map((price) =>
      typeof price === "number" ? price : 0
    );

    return (
      <div>
        <h4 className="sales-header">
          <span>Packs</span>
          <span>Prices</span>
        </h4>
        {packages.map((pack, index) => {
          const packLen = pack.length;
          const priceLen = String(numericPrices[index]).length;
          const indexLen = String(index + 1).length;
          const totalLen = 20;
          const dotsLen = totalLen - (packLen + priceLen + indexLen + 5);

          let dots = "";
          for (let i = 0; i < dotsLen; i++) {
            dots += ".";
          }

          return (
            <p key={index}>
              {index + 1}. {pack} {dots}{" "}
              {numericPrices[index] === 0 ? "?" : numericPrices[index]}
            </p>
          );
        })}
        <p className="totalAmt">
          Total: GH&#8373;
          {numericPrices.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
        </p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  function plainTextFormat(packages, allPrices) {
    const output = [];
    output.push("*PACKS*\t\t*PRICES*");

    const copiedPrices = allPrices.slice();

    for (let i = 0; i < packages.length; i++) {
      const pack = packages[i];
      const price = copiedPrices[i];
      const packLen = pack.length;
      const priceStr = price !== undefined ? price.toString() : "?";
      const priceLen = priceStr.length;
      const middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${priceStr}`;
      output.push(line);
    }
    const total = copiedPrices.reduce((acc, curr) => acc + (curr || 0), 0);
    output.push(`\n*Total: GH₵${total.toFixed(2)}*`);
    const today = new Date().toLocaleDateString();
    output.push(`\n*Orders placed on ${today}*`);
    return output;
  }

  return (
    <div className="main-container">
      <div className="packs-prices">
        <div className="form">
          <div className="form-container">
            <div className="input-sales">
              <p className="small-text guide">
                Enter packages separating each with a space or the plus sign [ +
                ]
              </p>
              <AllInput
                placeholder="10 + 7 9 + 6 4"
                id="mtnInput"
                value={mtnInputValue}
                onChange={(value) =>
                  handleInputChange(value, setMTNInputValue, setMTNInputError)
                }
                onBlur={() => handleInputBlur(setMTNInputError)}
                errorMessage={mtnInputError}
                label="Enter MTN Packages"
              />
              <AllInput
                placeholder="10 + 7 9 + 6 4"
                id="atInput"
                value={atInputValue}
                onChange={(value) =>
                  handleInputChange(value, setATInputValue, setATInputError)
                }
                onBlur={() => handleInputBlur(setATInputError)}
                errorMessage={atInputError}
                label="Enter AT Packages"
              />
              <AllInput
                placeholder="10 + 7 9 + 6 4"
                id="vodaInput"
                value={vodaInputValue}
                onChange={(value) =>
                  handleInputChange(value, setVodaInputValue, setVodaInputError)
                }
                onBlur={() => handleInputBlur(setVodaInputError)}
                errorMessage={vodaInputError}
                label="Enter Vodafone Packages"
              />
            </div>
          </div>

          <div className="packs-container">
            {tableContent}
            {!isCopied && (
              <button className="copy" onClick={handleCopyToClipboard}>
                <img src={copyIcon} alt="copy icon" />
                <span>Copy</span>
              </button>
            )}
            {isCopied && <p className="copied">copied!</p>}
          </div>
        </div>
      </div>
      <PaymentDetails serverDetails={serverDetails} />
    </div>
  );
};

export default AllCalculator;
