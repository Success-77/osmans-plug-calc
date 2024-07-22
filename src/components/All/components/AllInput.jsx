import React from "react";

const AllInput = ({
  placeholder,
  id,
  value,
  onChange,
  onBlur,
  errorMessage,
  label,
}) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const handleInputBlur = () => {
    onBlur();
  };

  return (
    <div className="input-field">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {errorMessage && <p className="error guide">{errorMessage}</p>}
    </div>
  );
};

export default AllInput;
