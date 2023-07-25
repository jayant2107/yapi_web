import styled from "styled-components";

export const FormikWrap = styled.div`
  width: 100%;
  .error {
    margin: 0;
    font-family: "Inter";
    color: #f44336;
    font-size: 13px;
    font-weight: 500;
    text-align: start;
    padding: 5px 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  background: rgb(245, 246, 247);
  border-radius: 500px;
  border-style: none;
  padding-left: 16px;
  margin: 0 !important;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: rgb(0, 0, 0);
`;
