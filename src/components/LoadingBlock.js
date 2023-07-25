import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function LoadingBlock({ dotColor, ringsColor }) {
  return (
    <LoadingbuttonWrapper dotColor={dotColor} ringsColor={ringsColor}>
      <div className="wrapper">
        <div className="dot"></div>
      </div>
    </LoadingbuttonWrapper>
  );
};

LoadingBlock.propTypes = {
  dotColor: PropTypes.string,
  ringsColor: PropTypes.string
};

const LoadingbuttonWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    z-index: 0;
    opacity: 1;
    animation-name: effect-3;
    animation-duration: 5s, 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease, linear;
    ${props => `background: ${props?.dotColor};`}
  }

  .wrapper::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -65px 0 0 -65px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    opacity: 1;
    z-index: 1;
  }

  .wrapper::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -65px 0 0 -65px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    opacity: 1;
    z-index: 2;
  }

  .wrapper::after,
  .wrapper::before {
    ${props => `border: 2px solid ${props?.ringsColor};`}
  }

  .wrapper::after {
    animation-name: effect-3, effect-1;
    animation-duration: 5s, 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease, linear;
  }

  .wrapper::before {
    animation-name: effect-3, effect-2;
    animation-duration: 5s, 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease, linear;
  }

  @keyframes effect-1 {
    0% {
      transform: perspective(1000px) rotate3d(1, 1, 1, 0deg);
    }
    100% {
      transform: perspective(1000px) rotate3d(1, 1, 1, 360deg);
    }
  }

  @keyframes effect-2 {
    0% {
      transform: perspective(1000px) rotate3d(1, -1, 1, 0deg);
    }
    100% {
      transform: perspective(1000px) rotate3d(1, -1, 1, 360deg);
    }
  }

  @keyframes effect-3 {
    0%,
    100% {
      opacity: 0;
    }
    25%,
    75% {
      opacity: 1;
    }
  }
`;
