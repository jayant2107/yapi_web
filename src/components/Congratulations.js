/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ForgetWrapper } from "../app/Auth/Forget/ForgetStyle";
// import { AppLogo } from "../utils/Images/Images";
import { PublicButton } from "./PublicButton";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Otp from "./Otp";
import { message } from "antd";
import { verifyOtp } from "../services/Collections";
import { useDispatch } from "react-redux";
import { SignInStep } from "../app/Auth/signIn/SignInSlice";

export const Congratulations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { email } = state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "20%",
    height: "52px",
    margin: "0 0px",
    borderRadius: "10px",
    borderStyle: "none",
    background: "rgb(61 151 242 / 20%)"
  };
  const handleSubmit = () => {
    navigate("/");
  };

  const isValidOtp = async () => {
    if (otp && otp.length == 6) {
      setLoading(true);
      let payload = { email: email, otp: otp };
      let res = await verifyOtp(payload);
      if (res?.status === 200) {
        const result = { ...res?.data, token: res?.token };
        dispatch(SignInStep(result));
        message.success(res?.message);
        navigate("/accept-invitation");
      } else {
        message.error(
          res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
        );
      }
      setLoading(false);
    } else {
      message.error("Please enter valid otp");
    }
  };

  return (
    <ForgetWrapper>
      <section style={{ padding: "30px 0px 0px 0px", height: "max-content" }}>
        {/* <img src={AppLogo} /> */}
        <div>
          <header>Check your email for a code</header>
          <subheader>
            We've sent a 6-character code to sulaman.abir@gmail.com. The code expires shortly.
            Please enter it soon.
          </subheader>

          <div className="inner-Section">
            <VerifyOtp>
              <Otp otp={otp} setOtp={setOtp} inputStyle={inputStyle} />
            </VerifyOtp>
            <div className="btn-wrapper">
              <ButtonWrapper>
                <PublicButton
                  textcard={"Back"}
                  handleAction={handleSubmit}
                  color={"#3D3D3D"}
                  background={"#F5F5F5"}
                />
                <PublicButton
                  textcard={"Continue"}
                  handleAction={isValidOtp}
                  color={"#FFFFFF"}
                  background={"#3D97F2"}
                  isLoading={loading}
                />
              </ButtonWrapper>
            </div>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
};

const VerifyOtp = styled.div`
  width: 100%;
  margin: 20px 0 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  div {
    margin: 5px;
  }
`;
