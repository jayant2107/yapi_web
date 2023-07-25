import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NotificationTabs } from "../app/Auth/signIn/SignInSlice";
import { DummyProfile } from "../utils/Images/Images";
import PropTypes from "prop-types";
import { BackArrow } from "../utils/Icons/SvgIcons";

export const Notification = ({ setOpenDrawer, backArrow }) => {
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state?.LoginSlice?.notificationTab);

  console.log(activeTab, "activeTab");

  const handleTab = (val) => {
    dispatch(NotificationTabs(val));
  };
  return (
    <NotificationWrapper>
      <div className="title">
        {backArrow && (
          <div onClick={() => setOpenDrawer(false)}>
            <BackArrow />
          </div>
        )}{" "}
        <h2>Notification</h2>
      </div>

      <div className="tabs">
        <h3 className={activeTab == 1 ? "activeTab" : "tab"} onClick={() => handleTab(1)}>
          All <span>12</span>
        </h3>
        <h4 className={activeTab == 2 ? "activeTab" : "tab"} onClick={() => handleTab(2)}>
          Archived <span>2</span>
        </h4>
      </div>

      <div className="all-content">
        {activeTab == 1 ? (
          <>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  Jaren Williams has mentioned you in Team Dashboard chat. <u>See message</u>
                </h4>

                <p>10 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
            <div className="flex-wrap">
              <img src={DummyProfile} alt="" />

              <div>
                <h4>
                  It’s <b>Kyler Chem‘</b>s birthday today ! Send him some best wishes for him
                </h4>

                <p>8 hrs ago</p>
              </div>
            </div>
          </>
        )}
      </div>
    </NotificationWrapper>
  );
};

Notification.propTypes = {
  setOpenDrawer: PropTypes.func,
  backArrow: PropTypes.bool
};

const NotificationWrapper = styled.div`
  width: 420px;
  padding: 10px;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
  }

  .title {
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: center;
    h2 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #101010;
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    margin-top: 29px;
    border-border: 1px solid #e5e7eb;

    .activeTab {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #101010;
      display: flex;
      gap: 8px;
      padding: 0 10px 7px 10px;
      border-bottom: 2px solid #101010;

      span {
        background: #101010;
        border-radius: 16px;
        padding: 0 5px;
        height: 20px;
        color: #ffff;
      }
    }

    .tab {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #4b5563;
      display: flex;
      gap: 8px;
      padding: 0 10px 7px 10px;
      cursor: pointer;
      span {
        background: #e5e7eb;
        border-radius: 16px;
        padding: 0 5px;
        height: 20px;
        color: #4b5563;
      }
    }
  }

  .all-content {
    width: 100%;
    height: 522px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 3px;
      height: 2px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #fff;
    }
    ::-webkit-scrollbar-thumb {
      background: #cecece;
      border-radius: 10px;
    }

    @media (max-height: 840px) {
      height: 400px;
    }

    @media (max-width: 500px) {
      height: 100%;
    }

    .flex-wrap {
      display: flex;
      gap: 8px;
      padding: 16px 0;
      border-bottom: 1px solid #e5e7eb;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      h4 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #101010;
      }

      p {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #4b5563;
        margin-top: 8px;
      }
    }
  }
`;
