import React, { useState } from "react";

const CreditCardForm = () => {
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");

  const handleExpiryDateChange = (event) => {
    const { value } = event.target;
    setExpiryDate(value);
  };

  const validateExpiryDate = () => {
    // Perform the expiry date validation logic here
    // You can use regular expressions or other date manipulation libraries

    // Example validation: Check if the date is in the format MM/YY and it is not expired
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const isValid = regex.test(expiryDate);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (!isValid) {
      setExpiryDateError("Invalid expiry date format");
    } else {
      const [month, year] = expiryDate.split("/");
      if (
        parseInt(year, 10) < currentYear ||
        (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
      ) {
        setExpiryDateError("Card has expired");
      } else {
        setExpiryDateError("");
      }
    }
  };

  return (
    <div>
      <label>Expiry Date:</label>
      <input
        type="text"
        value={expiryDate}
        onChange={handleExpiryDateChange}
        onBlur={validateExpiryDate}
      />
      {expiryDateError && <span className="error">{expiryDateError}</span>}
    </div>
  );
};

export default CreditCardForm;
