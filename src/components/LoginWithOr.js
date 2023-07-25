import React from "react";
import styled from "styled-components";

export const LoginWithOr = () => {
  return (
    <LoginWithOrWrapper className="other-option">
      <ul>
        <li className="gray-line"></li>
        <li>OR</li>
        <li className="gray-line"></li>
      </ul>
    </LoginWithOrWrapper>
  );
};

const LoginWithOrWrapper = styled.div`
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    .gray-line {
      height: 1px;
      width: 100%;
      background: #dddddd;
    }
    li {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      color: #101010;
    }
  }
`;
