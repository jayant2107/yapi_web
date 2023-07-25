import React from "react";
import styled from "styled-components";
import { AppLogo, ConnectServiceLogo } from "../../../utils/Images/Images";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../../../validation/inputField";
import { PublicButton } from "../../../components/PublicButton";
import { LoginWithOr } from "../../../components/LoginWithOr";
import SignInWithGoogle from "../../../components/SignInWithGoogle";

export default function Step01() {
    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Email must be a valid email").required("Email is required"),
        password: yup.string().required("Password is required")
    });

    const handleSubmit = (values) => {
        console.log(values, "values");
        navigate("/connect-slack");
    };

    return (
        <ConnectServiceTitanWrapper>
            <section>
                <img src={AppLogo} />

                <div className="stepsWrapper">
                    <div className="img-box">
                        <img src={ConnectServiceLogo} alt="" />
                    </div>
                    <div className="step-name">
                        <h4>Step 01:</h4>
                        <p>Set up account information</p>
                    </div>
                </div>
                <div className="three-line-box">
                    <div className="black"></div>
                    <div className="gray"></div>
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
                                <div className="two-in-one">
                                    <div className="gapRow">
                                        <label>First Name</label>
                                        <Field
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            component={InputField}
                                        />
                                    </div>
                                    <div className="gapRow">
                                        <label>Last Name</label>
                                        <Field
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastName"
                                            component={InputField}
                                        />
                                    </div>
                                </div>

                                <div className="gapRow">
                                    <label>Email</label>
                                    <Field
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        component={InputField}
                                    />
                                </div>
                                <div className="gapRow">
                                    <label>Password</label>
                                    <Field
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        component={InputField}
                                    />
                                </div>

                                <div className="btn-wrapper">
                                    <PublicButton textcard={"Next"} />
                                </div>
                                <div>
                                    <LoginWithOr />
                                </div>
                                <div>
                                    <SignInWithGoogle />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </section>
        </ConnectServiceTitanWrapper>
    );
}

const ConnectServiceTitanWrapper = styled.div`
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
      padding: 0px !important;
      margin-bottom: 30px;
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
        margin-bottom: 28px;
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
      margin: 12px 0 8px 0px;
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
      }

      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 0px;
      }

      .two-in-one {
        display: flex;
        gap: 16px;
        div {
          label {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #101010;
          }
          input {
            margin-top: 4px;
          }
        }
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
        ${"" /* margin-bottom: 16px; */}

        :focus {
          outline: none;
        }
      }
      .btn-wrapper {
        margin: 32px 0px 30px 0px;
      }
    }
  }
`;
