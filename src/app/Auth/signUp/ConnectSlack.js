import React, { useState } from "react";
import { AppLogo, ConnectSlackLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import styled from "styled-components";
import { InfoIcon, SMS } from "../../../utils/Icons/SvgIcons";
import BackButton from "../../../components/BackButton";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { slackConnection } from "../../../services/Collections";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStatus } from "../../../services/Collections";
import { SignInStep } from "../signIn/SignInSlice";
import { message } from "antd";

export const ConnectSlack = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.LoginSlice?.data);
  const dispatch = useDispatch();
  const [signUpTypeActive, setSignUpTypeActive] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(signUpTypeActive, "signUpTypeActive");
  const initialValues = {
    signInKey: "",
    botToken: ""
  };

  const validationSchema = yup.object().shape({
    signInKey: yup.string().required("Key is required"),
    botToken: yup.string().required("Token is required")
  });

  console.log("userDetails", userDetails);

  const ConnectToSlack = async (payload) => {
    let currentWorkSpace = userDetails?.companies?.find(
      (workspace) => workspace?.currentWorkSpaceStatus
    );
    console.log("currentWorkSpace", currentWorkSpace);
    let request = {
      signing_key: payload?.signInKey,
      token: payload?.botToken,
      db_name: `cxc_${currentWorkSpace?._id}_${currentWorkSpace?.tenantId}`
    };
    let res = await slackConnection(request);
    console.log(res, "ConnectToSlack");
    if (res.message === "OK") {
      return true;
    } else {
      setLoading(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
      return false;
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    let isConnectedWithSlack = await ConnectToSlack(values);

    if (isConnectedWithSlack) {
      let obj = {
        slackBotToken: values?.botToken,
        connectionStatus: true
      };
      let res = await updateProfileStatus(obj);
      if (res?.status === 200) {
        message.success(res?.message);
        let obj = {...userDetails, ...res?.data};
        dispatch(SignInStep(obj));
        setLoading(false);
        navigate("/select-lenders");
      } else {
        setLoading(false);
        message.error(
          res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
        );
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <ConnectSlackWrapper>
      <section>
        <img src={AppLogo} />

        <div className="stepsWrapper">
          <div className="img-box">
            <img src={ConnectSlackLogo} alt="" />
          </div>
          <div className="step-name">
            <h4>Step 02:</h4>
            <p>Connect Slack</p>
          </div>
        </div>
        <div className="three-line-box">
          <div className="black"></div>
          <div className="black"></div>
          <div className="gray"></div>
        </div>
        <div>
          <header>Setup</header>
          <subheader>Set up to create & visit your dashboard</subheader>
          <div className="inner-Section">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Form>
                <div className="gapRow">
                  <label>Slack Sign in Key</label>
                  <Field
                    type="text"
                    placeholder="Enter Slack Sign in Key"
                    name="signInKey"
                    component={InputField}
                  />
                </div>
                <div className="gapRow">
                  <label>Bot Token</label>
                  <Field
                    type="text"
                    placeholder="Enter bot token number"
                    name="botToken"
                    component={InputField}
                  />
                </div>

                <div className="info-wrapper">
                  <InfoIcon className="info-icon" />
                  <p>How to acquire App key</p>
                </div>

                <div className="or">
                  <p>OR</p>
                </div>

                <div className="sms">
                  <div className="logo-label">
                    <SMS />
                    <p>SMS</p>
                  </div>
                  <div className="checkbox-container">
                    <label className="container-checkbox">
                      <input
                        type="checkbox"
                        name="type"
                        onChange={(e) => setSignUpTypeActive(e.target.value)}
                        value="2"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div className="btn-wrapper">
                  <PublicButton textcard={"Next"} isLoading={loading} />
                </div>
                <div className="go-back-div">
                  <BackButton textcard={"Go back"} handleAction={-1} />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </ConnectSlackWrapper>
  );
};

const ConnectSlackWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #101010;
    border-radius: 10px;
  }

  section {
    width: 500px;
    height: 100%;
    padding: 30px 0;
    @media (max-width: 1440px) {
      width: 75%;
    }
    @media (min-width: 480px) and (max-width: 834px) {
      margin-top: 47px;
      margin-bottom: 30px;
      padding: 0px !important;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      width: 87%;
      margin-top: 51px;
      margin-bottom: 30px;
      padding: 0px !important;
    }

    img {
      width: 98px;
      height: 48px;
      margin-bottom: 84px;

      @media (max-height: 850px) {
        margin-bottom: 50px;
      }
      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 40px;
      }
    }

    .stepsWrapper {
      display: flex;
      gap: 15px;
      align-items: center;

      .img-box {
        img {
          width: 48px;
          height: 48px;
          margin-bottom: 0px;

          @media (max-height: 850px) {
            margin-bottom: 0px;
          }
        }
      }

      .step-name {
        h4 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #101010;
        }

        p {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #4b5563;
        }
      }
    }

    .three-line-box {
      display: flex;
      gap: 8px;
      padding: 14px 0;

      .black {
        width: 160px;
        border-bottom: 3px solid #101010;
      }
      .black2 {
        width: 160px;
        border-bottom: 3px solid #b5bac0;
      }
      .gray {
        width: 160px;
        border-bottom: 3px solid #d9e0e7;
      }
    }

    header {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 40px;
      color: #101010;
      margin: 12px 0;
    }

    subheader {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #4b5563;
    }

    .inner-Section {
      display: flex;
      flex-direction: column;
      margin: 30px 0;

      .gapRow {
        margin-top: 10px;
        input {
          margin: 5px 0 !important;
        }
      }

      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 0px;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 0px;
      }

      .or {
        width: 100%;
        height: 1px;
        background: #dddddd;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          padding: 0 12px;
          background: rgb(246, 249, 252);
          color: #101010;
          font-size: 14px;
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
        }
      }

      .sms {
        width: 240px;
        height: 56px;
        border-radius: 8px;
        background: #fff;
        margin: 54px 0 39px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px 0 12px;

        .logo-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          p {
            color: #4b5563;
            font-size: 14px;
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
          }
        }

        .checkbox-container {
          margin-top: 2px;
          .container-checkbox {
            display: block;
            position: relative;
            padding-left: 20px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
            }
            input:checked ~ .checkmark {
              background-color: #080808;
              border-style: none;
            }
            .checkmark {
              position: absolute;
              top: 0;
              left: 0;
              width: 24px;
              height: 24px;
              background-color: #fff;
              border-radius: 20px;
              border: 1px solid var(--gray-300, #d0d5dd);
            }
            .checkmark:after {
              content: "";
              position: absolute;
              display: none;
            }
            input:checked ~ .checkmark:after {
              display: block;
            }
            .checkmark:after {
              left: 9.5px;
              top: 5px;
              width: 4px;
              height: 9px;
              border: 2.375px solid #fff;
              border-width: 0 2px 2px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          }
        }
        p {
          color: #101010;
          font-size: 16px;
          font-family: Inter;
          font-weight: 500;
          line-height: 24px;
        }
      }
      .info-wrapper {
        margin: 12px 0 34px 0;
      }
      label {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #101010;
        padding: 5px 0;
      }

      input {
        width: 100%;
        height: 52px;
        filter: drop-shadow(0px 2px 12px rgba(16, 24, 40, 0.06));
        background: #ffffff;
        border-radius: 8px;
        border-style: none;
        padding: 14px 16px;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #4b5563;

        :focus {
          outline: none;
        }
      }
      .btn-wrapper {
        margin: 30px 0;
      }
    }
  }
`;
