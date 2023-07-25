import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LoadingButtonAnimation from "./LoadingButtonAnimation";
// import { useNavigate } from "react-router-dom";
export const PublicButton = ({ textcard, handleAction, isLoading, color, background }) => {
  // const navigate = useNavigate();
  return handleAction ? (
    <PublicButtonWrapper onClick={handleAction} color={color} background={background}>
      <button type="submit">{textcard}</button>
    </PublicButtonWrapper>
  ) : (
    <PublicButtonWrapper color={color} background={background}>
      {isLoading ? <LoadingButtonAnimation /> : <button type="submit">{textcard}</button>}
    </PublicButtonWrapper>
  );
};

PublicButton.propTypes = {
  textcard: PropTypes.string,
  handleAction: PropTypes.string,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
  background: PropTypes.string
};

const PublicButtonWrapper = styled.div`
  width: 100%;
  button {
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    background: #3d97f2;
    background: ${({ background }) => (background ? background : "#3d97f2")};
    color: ${({ color }) => (color ? color : "#fff")};
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    border-style: none;
    letter-spacing: -0.01em;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.16);
    }
  }

  div {
    width: 100%;
    padding: 15px;
    background: transparent;
    border-radius: 8px;
    text-align: center;
    color: #ffff;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    border-style: none;
    letter-spacing: -0.01em;
    cursor: pointer;
  }
`;
