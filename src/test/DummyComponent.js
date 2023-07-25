import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { OpenSideNav } from "../app/Auth/signIn/SignInSlice";

export default function DummyComponent() {
  const dispatch = useDispatch();
  return (
    // <ResponsiveHeaderButton onClick={() => dispatch(OpenSideNav(true))}></ResponsiveHeaderButton>
    <ResponsiveHeaderButton onClick={() => dispatch(OpenSideNav(true))}></ResponsiveHeaderButton>
  );
}

export const ResponsiveHeaderButton = styled.div`
  width: 50px;
  height: 20px;
  position: absolute;
  top: 23px;
  left: 27px;
  z-index: 99;
`;
