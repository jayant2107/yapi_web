/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import { BackArrowPng, DummyProfile } from "../utils/Images/Images";
import { CreateNewAccount, ProfileExit, SwitchAccount } from "../utils/Icons/SvgIcons";

import PropTypes from "prop-types";
import useWindowWidth from "../customHook/GetWindowWidth";
import { DeleteModal } from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { SignInStep, VerifyOtpAction } from "../app/Auth/signIn/SignInSlice";
import { ConnectCrmModal } from "./ConnectCrmModal";
import { message } from "antd";
import { createWorkspace, switchWorkspace } from "../services/Collections";

const ManageGoogleAccount = ({ backArrow, setProfileDrawer, handlePopup }) => {
  const [width] = useWindowWidth();
  const [logoutModal, setLogout] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const [connectModalData, setConnectModalData] = useState(null);
  const [connectModalLoader, setConnectModalLoader] = useState(false);
  const [addNewCrnModal, setAddNewCrnModal] = useState(false);
  const dispatch = useDispatch();
  const workspaceCRM = useSelector((state) => state?.LoginSlice?.data?.companies);
  const userDetails = useSelector((state) => state?.LoginSlice?.data);
  const [addedNewCompany, setAddedNewCompany] = useState(false);
  const [addedNewCompanyName, setAddedNewCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(SignInStep(null));
    dispatch(VerifyOtpAction(null));
  };
  const handleConnectCRM = async (payload) => {
    console.log(payload, "payload");
    setConnectModalLoader(true);
    let requestPayload = {
      workSpaceId: payload?._id
    };

    let res = await switchWorkspace(requestPayload);
    if (res?.status === 200) {
      console.log(res, "resssssssssssssss");
      setConnectModalLoader(false);
      message.success(res?.message);
      let obj = { ...userDetails, ...res?.data };
      setConnectModal(false);
      console.log(obj, "objeeeeeeeee");
      dispatch(SignInStep(obj));
    } else {
      setConnectModalLoader(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  const GenerateAvatarName = (payload) => {
    let name = payload?.toString();

    let first = name?.split(" ")?.[0]?.slice(0, 1);
    let second = name?.split(" ")?.[1]?.slice(0, 1);
    if (first && second) {
      return first + second;
    } else if (first) {
      return first;
    } else if (second) {
      return second;
    }
  };

  const getDynamic = () => {
    let generateColor = (Math.random() * 1000000)?.toString()?.split(".");
    return `#${generateColor?.[0]}`;
  };

  const handleCreateWorkspace = async () => {
    setLoading(true);
    let reqPayload = {
      workSpaceName: addedNewCompanyName
    };
    let res = await createWorkspace(reqPayload);
    if (res.status === 200) {
      console.log(res.data, "adtadtadatdat");
      let obj = { ...userDetails, companies: res?.data?.companies };
      console.log(obj, "objeeeeeeeeeeeee");
      dispatch(SignInStep(obj));
      setLoading(false);
      setAddedNewCompany(false);
    } else {
      message.error(res?.data?.status || "Something went wrong", 10);
      setLoading(false);
    }
  };

  return (
    <>
      {logoutModal && (
        <DeleteModal
          handleClose={() => setLogout(false)}
          open={logoutModal}
          title="Are you sure you want to Log out ?"
          description="All your process and data will be saved."
          button="Log out"
          btnColor="#E93124"
          handleSubmit={handleLogout}
        />
      )}
      {connectModal && (
        <DeleteModal
          handleClose={() => setConnectModal(false)}
          open={connectModal}
          title="Are you sure you want to Connect this CRM ?"
          description="All your process and data will be saved."
          button="Connect"
          btnColor="green"
          handleSubmit={() => handleConnectCRM(connectModalData)}
          isLoading={connectModalLoader}
        />
      )}
      {addNewCrnModal && (
        <ConnectCrmModal
          open={addNewCrnModal}
          handleClose={() => setAddNewCrnModal(false)}
          connectModalData={connectModalData}
        />
      )}

      <ManageGoogleAccountWrapper style={{ width: width > 500 ? "362px" : "100%" }}>
        {backArrow && (
          <div className="arrow-img-div" onClick={() => setProfileDrawer(false)}>
            <img className="backArrowImg" src={BackArrowPng} />
          </div>
        )}

        <div className="upper-section">
          <img src={DummyProfile} />
          <h3>Talan George</h3>
          <h4>talangeorge56@cxc.com</h4>
          <div>
            <button className="btn1">Manage your CxC account</button>
            <button className="btn2">
              <ProfileExit />
            </button>
          </div>
        </div>

        {userDetails?.role != "manager" && (
          <div className="Crm-box">
            <div className="title">
              <h3>Connect Service Titan</h3>
            </div>

            {workspaceCRM &&
              workspaceCRM?.map((crm, idx) => (
                <div key={idx} className="content">
                  <div className="avatar-name">
                    <div className="avatar" style={{ background: getDynamic() }}>
                      {GenerateAvatarName(crm?.workSpaceName)}
                    </div>
                    <h4>{crm?.workSpaceName}</h4>
                  </div>
                  {crm?.currentWorkSpaceStatus ? (
                    <button className="connected">Connected</button>
                  ) : crm?.tenantId ? (
                    <button
                      onClick={() => {
                        setConnectModal(true);
                        handlePopup(false);
                        setConnectModalData(crm);
                      }}
                      className="connect">
                      Switch
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAddNewCrnModal(true);
                        handlePopup(false);
                        setConnectModalData(crm);
                      }}
                      className="connect">
                      Connect
                    </button>
                  )}
                </div>
              ))}

            {/* <div className="footer-section">
            <section
              onClick={() => {
                setAddNewCrnModal(true);
                handlePopup(false);
              }}
              className="create-new-account">
              <CreateNewAccount />
              <span>Add new CRM</span>
            </section>
          </div> */}

            <div className="footer-section">
              {!addedNewCompany ? (
                <section onClick={() => setAddedNewCompany(true)} className="create-new-account">
                  <CreateNewAccount />
                  <span>Add new company</span>
                </section>
              ) : (
                <section className="create-new-company">
                  <input
                    type="text"
                    className="added-new-company"
                    placeholder="Enter new company name"
                    onChange={(e) => setAddedNewCompanyName(e.target.value)}
                  />
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <span onClick={handleCreateWorkspace}>Create</span>
                  )}
                </section>
              )}
            </div>
          </div>
        )}

        <div className="lower-section">
          <section>
            <img src={DummyProfile} />
            <div>
              <h3>Talan George</h3>
              <h4>talangeorge56@cxc.com</h4>
            </div>
          </section>
        </div>
        <div className="footer-section">
          <section className="create-new-account">
            <CreateNewAccount />
            <span>Add new CxC account</span>
          </section>
          <section className="switch-logout">
            <div>
              <SwitchAccount />
              <span>Switch account</span>
            </div>

            <div
              onClick={() => {
                handlePopup(false);
                setLogout(true);
              }}>
              <ProfileExit />
              <span>Sign out all acc</span>
            </div>
          </section>
        </div>
      </ManageGoogleAccountWrapper>
    </>
  );
};

ManageGoogleAccount.propTypes = {
  backArrow: PropTypes.bool,
  setProfileDrawer: PropTypes.func,
  handlePopup: PropTypes.func
};

export default ManageGoogleAccount;

const ManageGoogleAccountWrapper = styled.div`
  min-height: 400px;
  height: 480px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1px;
    height: 2px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #cecece;
    border-radius: 10px;
  }

  //   background: #ffffff;
  //   box-shadow: 0px 12px 24px -4px rgba(16, 24, 40, 0.06), 0px 4px 12px -2px rgba(16, 24, 40, 0.1);
  border-radius: 8px;

  .arrow-img-div {
    width: 85%;
    margin: auto;
    .backArrowImg {
      width: 28px;
      height: 20px;
    }
  }

  .back-arrow {
    position: absolute;
    top: 20px;
  }

  .footer-section {
    .switch-logout {
      width: 100%;
      display: flex;

      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        cursor: pointer;
        &:nth-child(1) {
          border-right: 1px solid #f2f4f7;

          span {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #3671e6;
            padding: 0 10px;
          }
        }

        &:nth-child(2) {
          span {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #3671e6;
            padding: 0 10px;
          }
        }
      }
    }

    .create-new-account {
      display: flex;
      align-items: center;
      background: #f6f9fc;
      gap: 8px;
      padding: 16px 30px;
      cursor: pointer;

      span {
        color: #3671e6;
        font-size: 14px;
        font-family: "Inter";
        font-weight: 500;
        line-height: 20px;
      }
    }
  }


  .create-new-company {
    display: flex;
    align-items: center;
    justify-content:space-between;
    background: #f6f9fc;
    gap: 8px;
    padding: 16px 30px;
    cursor: pointer;

    span {
      background: #000;
      color: #fff;
      font-size: 14px;
      font-family: "Inter";
      font-weight: 500;
      line-height: 20px;
      padding:5px 12px;
      border-radius: 500px;
    }

    label {
      background: #000;
      color: #fff;
      font-size: 14px;
      font-family: "Inter";
      font-weight: 500;
      line-height: 20px;
      padding:5px 12px;
      border-radius: 500px;
    }


    .added-new-company {
      color: #8f8f8f;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      letter-spacing: -0.14px;
      border-radius: 500px;
      background: #fff;
      border-style: none;
      padding: 8px;
    }
  }
}


  .lower-section {
    section {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      img {
        width: 36px;
        height: 36px;
      }
      div {
        margin: 0 12px;
        h3 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #101010;
        }
        h4 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: #4b5563;
        }
      }
    }
  }

  .upper-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f2f4f7;

    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin: 20px 0 12px 0;
    }

    h3 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #101010;
      padding: 4px 0;
    }

    h4 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #4b5563;
      padding: 4px 0;
    }
    div {
      display: flex;
      align-items: center;
      gap: 10px;
      .btn1 {
        padding: 10px 20px;
        border: 1px solid #dadce0;
        border-radius: 6px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01em;
        color: #3671e6;
        background: #ffffff;
        margin: 20px 0;
        cursor: pointer;
      }
      .btn2 {
        border-radius: 6px;
        border: 1px solid #dadce0;
        padding: 9px 12px 8px 12px;
        background: transparent;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .Crm-box {
    width: 100%;
    border-bottom: 1px solid #f2f4f7;
    padding: 10px 0;

    .title {
      width: 100%;
      padding: 0px 24px;
      text-align: center;

      h3 {
        font-family: "Inter";
        font-weight: 600;
      }
    }
    .content {
      padding: 10px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #101010;
      }
      .avatar-name {
        display: flex;
        align-items: center;
        gap: 10px;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #cecece;
          color: #fff;
          font-family: Inter;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px; /* 150% */
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .connected {
        width: 85px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ddf9e2;
        border-style: none;
        ${"" /* padding: 5px 10px; */}
        color: #03d42d;
        border-radius: 40px;
        cursor: pointer;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
      }
      .connect {
        width: 85px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(226, 237, 249);
        border-style: none;
        ${"" /* padding: 5px 10px; */}
        color: rgb(54, 121, 236);
        cursor: pointer;
        border-radius: 40px;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;
