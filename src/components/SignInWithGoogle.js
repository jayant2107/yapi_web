import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GoogleIcon } from "../utils/Images/Images";

const SignInWithGoogle = ({ text }) => {
  return (
    <SignInWithGoogleWrapper>
      {console.log(text)}
      <img src={GoogleIcon} alt="" />
      <p>{text}</p>
    </SignInWithGoogleWrapper>
  );
};

SignInWithGoogle.propTypes = {
  text: PropTypes.string
};

export default SignInWithGoogle;

const SignInWithGoogleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  border-radius: 8px;
  height: 52px;
  margin: 10px 0 10px 0 !important;
  filter: drop-shadow(0px 2px 12px rgba(16, 24, 40, 0.06));
  cursor: pointer;

  @media (min-width: 834px) and (max-width: 1480px) {
    margin-bottom: 10px !important;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 25px !important;
  }

  img {
    width: 24px !important;
    height: 24px !important;
    margin: 0px !important;
  }
  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101010;
    margin: 0px;
  }
`;
