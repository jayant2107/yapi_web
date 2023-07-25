/* eslint-disable react/jsx-key */
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidenav from "../../components/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import DummyComponent from "../../test/DummyComponent";
import { OpenSideNav } from "../../app/Auth/signIn/SignInSlice";

export const PrivateLayout = () => {
  const sidebar = useSelector((state) => state?.LoginSlice?.sideNav);
  const dispatch = useDispatch();
  const handleClickAway = () => {
    dispatch(OpenSideNav(false));
  };

  return (
    <PrivateLayoutWrapper sidebar={sidebar}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <section className="sidebar-section">
            <Sidenav />
          </section>
          <DummyComponent />
        </div>
      </ClickAwayListener>
      <section className="outlet-section">
        <div className="outlet-section-inner">
          <Outlet />
        </div>
      </section>
    </PrivateLayoutWrapper>
  );
};

const PrivateLayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  background: #1a1b55;
  transition: all 0.3s;

  .sidebar-section {
    width: 260px;
    height: 100vh;
    background: #1a1b55;
    position: fixed;
    z-index: 99999999;
    @media (max-height: 600px) {
      overflow-y: scroll;
    }

    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #fff;
    }
    ::-webkit-scrollbar-thumb {
      background: #101010;
      border-radius: 10px;
    }

    @media (max-width: 1440px) {
      width: 200px;
    }
    @media (max-width: 992px) {
      display: ${({ sidebar }) => !sidebar && "none"};
    }
  }
  .outlet-section {
    width: calc(100% - 260px);
    margin-left: 260px;
    margin-top: 16px;
    background: #1a1b55;
    height: 98vh;
    @media (max-height: 850px) {
      height: 95vh;
    }

    .outlet-section-inner {
      position: relative;
      width: 100%;
      height: 100%;
      background: #f6f9fc;
      border-top-left-radius: 20px;
      overflow-y: scroll;
      @media (max-width: 992px) {
        border-top-left-radius: 0;
      }
    }

    @media (max-width: 1440px) {
      margin-left: 200px;
      width: calc(100% - 200px);
    }

    @media (max-width: 992px) {
      width: 100%;
      margin: 0;
    }
  }
`;
