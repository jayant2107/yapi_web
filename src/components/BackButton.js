import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BackArrow } from "../utils/Icons/SvgIcons";
import { useNavigate } from "react-router";

export default function BackButton({ textcard, handleAction }) {
  const navigate = useNavigate();
  return (
    <BackButtonWrapper onClick={() => navigate(handleAction)}>
      <BackArrow />
      <p>{textcard}</p>
    </BackButtonWrapper>
  );
}

BackButton.propTypes = {
  textcard: PropTypes.string,
  handleAction: PropTypes.number || PropTypes.string
};

const BackButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;

  @media (min-width: 834px) and (max-width: 1480px) {
    padding-bottom: 25px !important;
  }

  svg {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }

  p {
    margin: 0 5px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #4b5563;
  }
`;
