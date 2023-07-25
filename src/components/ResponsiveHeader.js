import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BillNotification, Search, ThreeLines } from "../utils/Icons/SvgIcons";
import { AppLogo, DummyProfile, Recording } from "../utils/Images/Images";
import PropTypes from "prop-types";
import ManageGoogleAccount from "./ManageGoogleAccount";
import { Drawer, Popover } from "antd";
import useWindowWidth from "../customHook/GetWindowWidth";
import { OpenSideNav } from "../app/Auth/signIn/SignInSlice";
import { useDispatch } from "react-redux";
import { ProfileMobileView } from "./ProfileMobileView";
// import ClickAwayListener from "react-click-away-listener";
import { Notification } from "./Notification";
// import { ProfileMobileView } from "./ProfileMobileView";
// import ClickAwayListener from "react-click-away-listener";

export default function ResponsiveHeader({ isRecording, handleRecording }) {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const [width] = useWindowWidth();
  const [handleProfilePopup, setHandleProfilePopup] = useState(false);
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);

  // const handleClickAway = () => {
  //   setHandleProfilePopup(false);
  // };

  console.log(handleProfilePopup, "handleProfilePopup");

  const SearchPopup = () => {
    return (
      <SearchWrapper>
        <input type="text" placeholder="Search" className="input" />
      </SearchWrapper>
    );
  };

  useEffect(() => {
    if (width < 500 && openProfileDrawer) {
      setOpenProfileDrawer(false);
    }
    if (handleProfilePopup) {
      setHandleProfilePopup(false);
    }
    if (width < 500 && openNotificationDrawer) {
      setOpenNotificationDrawer(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <ResponsiveHeaderWrapper>
      <div className="right-properties">
        <div className="title-header">
          <div onClick={() => dispatch(OpenSideNav(true))}>
            <ThreeLines className="ThreeLinesGray" />
          </div>
          <img src={AppLogo} alt="" />
          {/* {backArrow && <BackArrow />}
          <header>{headerName}</header> */}
        </div>
      </div>

      <div className="left-properties">
        {isRecording && (
          <LiveRecording onClick={() => handleRecording(true)} width={width}>
            <img src={Recording} alt="" />
            <span>{width > 500 ? "3 people recording" : "3 rec.."}</span>
          </LiveRecording>
        )}
        {/* {showSearch && } */}
        <Popover placement="bottomLeft" trigger="click" content={<SearchPopup />}>
          <span onClick={() => setShowSearch(!showSearch)}>
            <Search />
          </span>
        </Popover>

        {width > 500 && (
          <span>
            <Popover
              className="notification-custom"
              placement="bottomLeft"
              trigger="click"
              content={
                <div>
                  <Notification />
                </div>
              }>
              <span>
                <BillNotification />
              </span>
            </Popover>
          </span>
        )}
        {width <= 500 && (
          <span onClick={() => setOpenNotificationDrawer(true)}>
            <BillNotification />
          </span>
        )}

        {width > 500 && (
          <div>
            <Popover
              placement="bottomLeft"
              trigger="click"
              open={handleProfilePopup}
              onOpenChange={setHandleProfilePopup}
              content={
                <ManageGoogleAccount backArrow={false} handlePopup={setHandleProfilePopup} />
              }>
              {/* <ClickAwayListener onClickAway={handleClickAway}> */}
              <img src={DummyProfile} onClick={() => setHandleProfilePopup(true)} />
              {/* </ClickAwayListener> */}
            </Popover>
          </div>
        )}

        {width <= 500 && (
          <div onClick={() => setOpenProfileDrawer(true)}>
            <img src={DummyProfile} />
          </div>
        )}

        {openProfileDrawer && (
          <Drawer
            className="filter-drawer"
            placement="right"
            closable={false}
            onClose={() => setOpenProfileDrawer(false)}
            open={openProfileDrawer}
            width={"100%"}
            key="bottom">
            <ProfileMobileView setProfileDrawer={setOpenProfileDrawer} />
          </Drawer>
        )}

        {openNotificationDrawer && (
          <Drawer
            className="filter-drawer"
            placement="right"
            closable={false}
            onClose={() => setOpenNotificationDrawer(false)}
            open={openNotificationDrawer}
            width={"100%"}
            key="bottom">
            <Notification backArrow={true} setOpenDrawer={setOpenNotificationDrawer} />
          </Drawer>
        )}
      </div>
    </ResponsiveHeaderWrapper>
  );
}

ResponsiveHeader.propTypes = {
  headerName: PropTypes.string,
  isFilter: PropTypes.bool,
  filterContent: PropTypes.func,
  backArrow: PropTypes.bool,
  handleRecording: PropTypes.func,
  isRecording: PropTypes.bool
};

const ResponsiveHeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  justify-content: space-between;
  background: #fff;
  padding: 0 27px;
  display: none;

  @media (max-width: 834px) {
    display: flex;
  }
  @media (max-width: 375px) {
    padding: 0 15px;
  }
  @media (max-width: 350px) {
    padding: 0 5px;
  }

  .right-properties {
    width: 100%;
    display: flex;
    align-items: center;

    .title-header {
      display: flex;
      align-items: center;
      gap: 15px;

      img {
        width: 74px;
        height: 32px;

        @media (max-width: 370px) {
          width: 60px;
          height: 32px;
        }
      }

      ${
        "" /* .Three-lines {
        width: 18px;
        height: 12px;
      } */
      }
    }
  }

  .left-properties {
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 350px) {
      gap: 10px;
    }
    svg {
      width: 20px;
      height: 20px;
    }

    span {
      cursor: pointer;
    }

    div {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      cursor: pointer;

      img {
        width: 34px;
        height: 34px;
      }
    }

    .ant-popover-inner {
      background: #e8edf3 !important;
    }

    input {
      width: 426px;
      padding: 10px 16px;
      background: #e8edf3;
      border-radius: 500px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      letter-spacing: -0.01em;
      color: #000;
      border-style: none;
    }
  }
`;

const LiveRecording = styled.button`
  width: ${({ width }) => (width > 500 ? "185px" : "88px")};
  height: 40px;
  background: #e8edf3;
  border-radius: 68px;
  display: flex;
  justify-content: center;
  gap: 9px;
  align-items: center;
  border-style: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #4b5563;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  background: #fff;

  input {
    width: 426px;
    padding: 10px 16px;
    background: #e8edf3;
    border-radius: 10px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.01em;
    color: #000;
    border-style: none;

    :focus {
      outline: none;
      border: 1px solid #cecece;
    }
  }
`;
