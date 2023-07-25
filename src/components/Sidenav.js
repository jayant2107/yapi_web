import React from "react";
import styled from "styled-components";
import { AppLogo } from "../utils/Images/Images";
import {
  Dashboard,
  Record,
  Team,
  Integration,
  Billing,
  Setting,
  Support,
  ThreeLines
} from "../utils/Icons/SvgIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OpenSideNav } from "../app/Auth/signIn/SignInSlice";

export default function Sidenav() {
  const location = useLocation()?.pathname;
  const navigate = useNavigate();
  const sidebar = useSelector((state) => state?.LoginSlice?.sideNav);
  const userDetails = useSelector((state) => state?.LoginSlice?.data);

  const navigateRoutes = (params) => {
    navigate(params);
  };

  const dispatch = useDispatch();
  return (
    <SidenavWrapper>
      <header>
        <img src={AppLogo} />
        {sidebar && (
          <div onClick={() => dispatch(OpenSideNav(false))} className="Three-lines">
            <ThreeLines className="ThreeLinesWhite" />
          </div>
        )}
      </header>

      <section>
        <div className="all-tabs">
          <div
            className={location.includes("dashboard") && "active"}
            onClick={() => navigateRoutes("dashboard")}>
            <Dashboard />
            <p>Dashboard</p>
          </div>
          <div
            className={location.includes("record") && "active"}
            onClick={() => navigateRoutes("recording")}>
            <Record />
            <p>Recording</p>
          </div>
          <div
            className={location.includes("team") && "active"}
            onClick={() => navigateRoutes("team")}>
            <Team />
            <p>Team</p>
          </div>
          <div
            className={location.includes("integration") && "active"}
            onClick={() => navigateRoutes("integration")}>
            <Integration />
            <p>Integrations</p>
          </div>
          {userDetails?.role != "manager" && (
            <div
              className={location.includes("billing") && "active"}
              onClick={() => navigateRoutes("billing")}>
              <Billing />
              <p>Billing</p>
            </div>
          )}
        </div>
        <div className="sidebar-footer">
          <div>
            <Setting />
            <p>Settings</p>
          </div>
          <div>
            <Support />
            <p>Support</p>
          </div>
        </div>
      </section>
    </SidenavWrapper>
  );
}

const SidenavWrapper = styled.div`
  width: 100%;
  background: #1a1b55;
  padding: 32px 16px;
  transition: all 0.3s;
  header {
    position: relative;
    img {
      width: 80px;
    }
  }

  .Three-lines {
    position: absolute;
    top: 14px;
    right: 10px;
    cursor: pointer;
  }

  section {
    width: 100%;
    height: calc(100vh - 78px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .all-tabs {
      width: 100%;
      margin: 32px 0;
      color: #ffffff;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;

      .active {
        background: #483e84;
        border-radius: 500px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: start;
        margin: 8px 0;
        cursor: pointer;

        padding: 12px 16px;

        svg {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }
    .sidebar-footer {
      width: 100%;
      margin: 32px 0;
      color: #ffffff;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;

      div {
        display: flex;
        align-items: center;
        justify-content: start;
        margin: 8px 0;
        cursor: pointer;
        // background: #343434;
        border-radius: 500px;
        padding: 12px 16px;

        svg {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }
  }
`;
