import React, { useState, useEffect, useMemo } from "react";

function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

const MTN = () => {
  const initialAgentPrices = useMemo(
    () => ({
      1: 5.7,
      2: 9.5,
      3: 14,
      4: 17.5,
      5: 21,
      6: 25,
      7: 30,
      8: 35,
      9: 37,
      10: 39,
      11: 5.3 + 38,
      12: 9.5 + 38,
      13: 14 + 38,
      14: 17.5 + 38,
      15: 60,
      16: 5.3 + 60,
      17: 9.5 + 60,
      18: 14 + 60,
      19: 17.5 + 60,
      20: 75,
      21: 5.3 + 75,
      22: 9.5 + 75,
      23: 14 + 75,
      24: 17.5 + 75,
      25: 90,
      26: 5.3 + 90,
      27: 9.5 + 90,
      28: 14 + 90,
      29: 17.5 + 90,
      30: 108,
      31: 5.3 + 105,
      32: 9.5 + 105,
      33: 14 + 105,
      34: 17.5 + 105,
      35: 117,
      36: 5.3 + 117,
      37: 9.5 + 117,
      38: 14 + 117,
      39: 17.5 + 117,
      40: 145,
      41: 5.3 + 135,
      42: 9.5 + 135,
      43: 14 + 135,
      44: 17.5 + 135,
      45: 155,
      46: 5.3 + 150,
      47: 9.5 + 150,
      48: 14 + 150,
      49: 17.5 + 150,
      50: 165,
      100: 315,
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
        <h5>MTN</h5>
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
          Total: GH&#8373;{prices.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
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
      <h4 className="sub-header">MTN</h4>
      <div className="form">
        <div className="input-sales">
          <label htmlFor="day_sales">
            Enter your sales packages separated with +
          </label>
          <input
            type="text"
            name="sales"
            id="day_sales"
            placeholder="10 + 7 + 9 + 6 + 4"
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

export default MTN;
