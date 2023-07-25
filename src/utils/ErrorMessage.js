import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function ErrorMessage({ message }) {
  return <ErrorMessageWrapper>{message}</ErrorMessageWrapper>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string
};

const ErrorMessageWrapper = styled.p`
  margin: 0;
  padding: 5px 0;
  color: red;
  font-size: 13px;
  font-family: Inter;
  line-height: 24px;
`;
