import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { PublicAppImg, YapiBackground } from "../../utils/Images/Images";

export const PublicLayout = () => {
  const location = useLocation()?.pathname;

  return (
    <PublicLayoutWrapper isBackgroundApply={location === "/"}>
      <div className="Outlet-box">
        <Outlet />
      </div>

      <div className="background-img-box">
        <img src={PublicAppImg} alt="" />
      </div>
    </PublicLayoutWrapper>
  );
};

const PublicLayoutWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background: rgb(250,252,255);

  @media (min-width: 390px) and (max-width: 834px) {
    flex-direction: column-reverse;
    overflow: scroll;
    height: 100%;
  }
  @media (min-width: 320px) and (max-width: 390px) {
    flex-direction: column-reverse;
    overflow: scroll;
    height: 100%;
  }

  .Outlet-box {
    width: 100%;
    height: 100%;
    background: ${({ isBackgroundApply }) =>
      isBackgroundApply ? "#f6f9fc" : `url(${YapiBackground}) no-repeat 50%`};
     background-size: cover;

    @media (min-width: 480px) and (max-width: 834px) {
      background: #f6f9fc;
      width: 100%;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      background: #f6f9fc;
      width: 100%;
    }
  }
  .background-img-box {
    display: ${({ isBackgroundApply }) => !isBackgroundApply ? "none" : "block"};
    width: 100%;
    height: 100%;
    @media (min-width: 480px) and (max-width: 834px) {
      display: block;
      width: 100%;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      display: block;
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;

      @media (min-width: 480px) and (max-width: 834px) {
        height: 340px;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        height: 219px;
      }
    }
  };
`;
