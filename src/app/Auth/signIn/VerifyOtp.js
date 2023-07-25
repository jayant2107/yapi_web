import React, { useState } from "react";
import { ForgetWrapper } from "../Forget/ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import Otp from "../../../components/Otp";
import { message } from "antd";
import { VerifyOtpAction } from "./SignInSlice";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
// var CryptoJS = require("crypto-js");

export default function LoginAsManager() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const inputStyle = { width: "20%", height: "52px", margin: "0 0px", borderRadius: "10px" };
  const ManagerDetails = useSelector((state) => state?.LoginSlice?.verifyOtp);


  const handleSubmit = () => {
    let obj = {
      role: "manager",
      profileStatus: "3"
    };
    if (otp) {
      let validateOTP = createAndCheckingHash(otp);
      if (validateOTP) {
        message.success("Success");
        dispatch(VerifyOtpAction({...ManagerDetails , ...obj}));
      } else {
        message.error("Please enter valid otp");
      }
    } else {
      message.error("Please enter valid otp");
    }
  };


  const createAndCheckingHash = (input) => {
    let InternalHash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

    if (ManagerDetails?.login_code === InternalHash) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ForgetWrapper>
      <section style={{ padding: "30px 0px 0px 0px", height: "max-content" }}>
        <img src={AppLogo} />
        <div>
          <header>Verify Otp</header>
          <subheader>Verify otp to visit your dashboards</subheader>
          <div className="inner-Section">
            <Otp otp={otp} setOtp={setOtp} inputStyle={inputStyle} />

            <div className="btn-wrapper" style={{ marginBottom: "15px" }}>
              <PublicButton textcard={"Verify"} handleAction={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}
