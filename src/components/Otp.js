import React from "react";
import OTPInput from "react-otp-input";
import PropTypes from "prop-types";

export default function Otp({ otp, setOtp, inputStyle }) {
  return (
    <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span style={{ margin: "0 8px" }}></span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={inputStyle}
      inputType="tel"
    />
  );
}

Otp.propTypes = {
  otp: PropTypes.string,
  setOtp: PropTypes.func,
  inputStyle: PropTypes.object
};
