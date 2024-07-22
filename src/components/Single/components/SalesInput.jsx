import React from "react";
import "./SalesInput.css";

const SalesInput = ({
  inputValue,
  handleInputChange,
  handleInputBlur,
  inputError,
  network,
  disable,
}) => {
  return (
    <div className="input-sales">
      <p className="small-text guide">
        Enter packages separating each with the plus sign [ + ]
      </p>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="2 + 3 + 10 + 5"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disable}
        />
        <label htmlFor="floatingInput">{`Enter ${network} Packages`}</label>
      </div>
      {inputError && <p className="error guide">{inputError}</p>}
    </div>
  );
};

export default SalesInput;
