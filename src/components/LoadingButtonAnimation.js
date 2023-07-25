import React from "react";
import styled from "styled-components";
import { CenterPartOfAppLogo, LeftPartOfAppLogo, RightPartOfAppLogo } from "../utils/Images/Images";

export default function LoadingButtonAnimation() {
  return (
    <LoadingButtonAnimationWrapper>
      <div className="left">
        <img src={LeftPartOfAppLogo} />
      </div>

      <div className="center">
        <img src={CenterPartOfAppLogo} />
      </div>

      <div className="right">
        <img src={RightPartOfAppLogo} />
      </div>
    </LoadingButtonAnimationWrapper>
  );
}

const LoadingButtonAnimationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 0 !important;

  @keyframes rotating {
    0% {
      -webkit-transform: rotateX(0deg);
      opacity: 1;
    }
    25% {
      -webkit-transform: rotateX(90deg);
      opacity: 0.8;
    }
    50% {
      -webkit-transform: rotateX(180deg);
      opacity: 1;
    }
    75% {
      -webkit-transform: rotateX(270deg);
      opacity: 0.8;
    }
    100% {
      -webkit-transform: rotateX(360deg);
      opacity: 1;
    }
  }

  @keyframes rotatingY {
    from {
      -webkit-transform: rotateY(0deg);
    }
    to {
      -webkit-transform: rotateY(360deg);
    }
  }

  .left {
    width: auto;
    padding: 0;
    animation: rotating 3s linear infinite;
    img {
      width: 28px;
      height: 36px;
      margin: 0;
    }
  }

  .center {
    width: auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: rotatingY 2s linear infinite;
    p {
      color: #fff;
      font-size: 16px;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    img {
      width: 20px;
      height: 20px;
      margin: 0;
    }
  }

  .right {
    width: auto;
    animation: rotating 3s linear infinite;
    padding: 0;
    img {
      width: 28px;
      height: 36px;
      margin: 0;
    }
  }
`;
