import React, { useState, useEffect, useMemo } from "react";

function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

const AT = () => {
  const initialAgentPrices = useMemo(
    () => ({
      1: 4.9,
      2: 7.8,
      3: 12,
      4: 14,
      5: 17,
      6: 20,
      7: 24,
      8: 27,
      9: 29,
      10: 33,
      11: 4.9 + 32,
      12: 8 + 32,
      13: 11 + 32,
      14: 14 + 32,
      15: 47,
      16: 4.9 + 47,
      17: 8 + 47,
      18: 11 + 47,
      19: 14 + 47,
      20: 64,
      21: 4.9 + 62,
      22: 8 + 62,
      23: 11 + 62,
      24: 14 + 62,
      25: 77,
      26: 4.9 + 77,
      27: 8 + 77,
      28: 11 + 77,
      29: 14 + 77,
      30: 94,
      31: 4.9 + 90,
      32: 8 + 90,
      33: 11 + 90,
      34: 14 + 90,
      35: 102,
      36: 4.9 + 117,
      37: 8 + 117,
      38: 11 + 117,
      39: 14 + 117,
      40: 128,
      41: 4.9 + 115,
      42: 8 + 115,
      43: 11 + 115,
      44: 14 + 115,
      45: 135,
      46: 4.9 + 146,
      47: 8 + 146,
      48: 11 + 146,
      49: 14 + 146,
      50: 160,
      60: 190,
    }),
    []
  );

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let values = inputValue.split("+").map((value) => value.trim());
    let packs = gigFormatter(values);
    let prices = amounts(initialAgentPrices, values);
    const formattedTable = tabularFormat(packs, prices);
    setTableContent(formattedTable);
  }, [inputValue, initialAgentPrices]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Input must contain only numbers, spaces, and +");
    }
  };

  const tabularFormat = (packages, prices) => {
    return (
      <div>
        <h4 className="sales-header">
          <span>Packs</span>
          <span>Prices</span>
        </h4>
        {packages.map((pack, index) => {
          const packLen = pack.length;
          const priceLen = String(prices[index]).length;
          const indexLen = String(index + 1).length;
          const totalLen = 20;
          const dotsLen = totalLen - (packLen + priceLen + indexLen + 5); // 5 is the number of additional characters including dots, spaces, and indexes

          let dots = "";
          for (let i = 0; i < dotsLen; i++) {
            dots += ".";
          }

          return (
            <p key={index}>
              {index + 1}. {pack} {dots} {prices[index]}
            </p>
          );
        })}
        <p className="totalAmt">
          Total: GH&#8373;
          {prices.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
        </p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  const handleCopyToClipboard = () => {
    if (inputValue) {
      let values = inputValue.split("+").map((value) => value.trim());
      let packs = gigFormatter(values);
      let prices = amounts(initialAgentPrices, values);
      const plainTextLines = plainTextFormat(packs, prices);

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

  function plainTextFormat(packages, prices) {
    let output = [];
    output.push("\n*PACKS*\t\t*PRICES*");
    for (let i = 0; i < packages.length; i++) {
      let pack = packages[i];
      let price = prices[i];
      let packLen = pack.length;
      let priceLen = price.toString().length;
      let middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${price}`;
      output.push(line);
    }
    let total = prices.reduce((acc, curr) => acc + curr, 0);
    output.push(`\n*Total: GH₵${total.toFixed(2)}*`);
    let today = new Date().toLocaleDateString();
    output.push(`\n*Orders placed on ${today}*`);
    return output;
  }

  return (
    <div className="main-container">
      <h4 className="sub-header">AT</h4>
      <div className="form">
        <div className="input-sales">
          <label htmlFor="day_sales">
            Enter your sales packages separated with +
          </label>
          <input
            type="text"
            name="sales"
            id="day_sales"
            placeholder="10 + 7 + 9 + 6 + 4.9"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputError && <p>{inputError}</p>}
        </div>
      </div>
      <div className="packs-container form">
        {tableContent}
        {!isCopied && (
          <button className="copy" onClick={handleCopyToClipboard}>
            Copy
          </button>
        )}
        {isCopied && <p>copied!</p>}
      </div>
    </div>
  );
};

export default AT;
