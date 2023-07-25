import React, { useEffect, useState } from "react";
import { ForgetWrapper, PasswordEyeWrapper } from "./ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import { Check, Dot, PasswordEye } from "../../../utils/Icons/SvgIcons";
import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from "formik";
// import InputField from "../../../validation/inputField";
import styled from "styled-components";
import { message, notification } from "antd";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { SignInStep } from "../signIn/SignInSlice";
import { resetPassword } from "../../../services/Collections";

export default function SetNewPassword() {
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [inputVal, setInputVal] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message) => {
    api.error({
      message: message
    });
  };
  // const [password, setPassword] = useState(null);
  const [passed, setPassed] = useState({
    min8: false,
    lowercase: false,
    uppercase: false,
    special: false,
    numbers: false,
    consecutive: false
  });
  const navigate = useNavigate();

  const initialValues = {
    newPassword: null,
    confirmPassword: null
  };

 
  function isIdentical(str) {
    if (str) {
      let pattern = new RegExp("\\b([a-zA-Z0-9])\\1\\1+\\b");
      if (str == null) {
        return false;
      }
      if (pattern.test(str) == true) {
        // return false;
        setPassed((prevState) => ({
          ...prevState,
          consecutive: false
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          consecutive: true
        }));
        // return true;
      }
    } else {
      setPassed({
        min8: false,
        lowercase: false,
        uppercase: false,
        special: false,
        numbers: false,
        consecutive: false
      });
    }
  }

  const validatePassword = (password) => {
    // console.log(password.search(^(?!.__)(?!._$)[A-Za-z]\w*$) !== -1 );
    if (password.length > 0) {
      if (password.length >= 8) {
        // console.log("passs");
        setPassed((prevState) => ({
          ...prevState,
          min8: true
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          min8: false
        }));
      }
      if (password.search(/[a-z]/) !== -1) {
        setPassed((prevState) => ({
          ...prevState,
          lowercase: true
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          lowercase: false
        }));
      }
      if (password.search(/[A-Z]/) !== -1) {
        setPassed((prevState) => ({
          ...prevState,
          uppercase: true
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          uppercase: false
        }));
      }
      if (password.search(/[0-9]/) !== -1) {
        setPassed((prevState) => ({
          ...prevState,
          numbers: true
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          numbers: false
        }));
      }
      if (password.search(/[$&+,:;=?@#|'<>.-^*()%!]/) !== -1) {
        setPassed((prevState) => ({
          ...prevState,
          special: true
        }));
      } else {
        setPassed((prevState) => ({
          ...prevState,
          special: false
        }));
      }
    } else {
      setPassed({
        min8: false,
        lowercase: false,
        uppercase: false,
        special: false,
        numbers: false,
        consecutive: false
      });
    }
  };

  console.log(passed, "passed");

  const handleSubmit = () => {
    if (!inputVal.newPassword) {
      openNotification("Password is required");
    } else {
      if (Object?.values(passed).filter((val) => val === false)?.length > 0) {
        openNotification("Please Enter valid password");
      } else {
        if (inputVal.confirmPassword) {
          if (inputVal.newPassword == inputVal.confirmPassword) {
            // navigate("/congratulation");

            handleSetNewPassword(inputVal?.confirmPassword);
          } else {
            openNotification("Confirm password does not match");
          }
        } else {
          openNotification("Confirm password is required");
        }
      }
    }
  };

  const handleSetNewPassword = async (password) => {
    let obj = {
      newPassword: password
    };
    let object = {
      header: "Congratulations!",
      subheader: "Your password has been changed successfully."
    };
    let res = await resetPassword(obj);
    if (res?.status === 200) {
      navigate("/congratulation", { state: object });
      message.success(res?.message);
    } else {
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    let url = window.location;
    let token = url?.search.split("=");
    console.log(token);
    let obj = {
      token: token?.[1]
    };
    dispatch(SignInStep(obj));
  });

  return (
    <ForgetWrapper>
      {contextHolder}
      <section>
        <img src={AppLogo} />
        <div>
          <header>Set new password</header>
          <subheader>New password must be different than previous password </subheader>
          <div className="inner-Section">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              render={({ setFieldValue }) => (
                <Form>
                  <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                    <label>New Password</label>
                    {/* <input type="password" placeholder="Enter new password" /> */}
                    {/* <Field
                      type={newPasswordType}
                      name="newPassword"
                      placeholder="Enter new password"
                      component={InputField}
                    /> */}
                    <input
                      type={newPasswordType}
                      placeholder="Enter new password"
                      name="newPassword"
                      onChange={(e) => {
                        validatePassword(e.target.value);
                        setFieldValue("newPassword", e.target.value);
                        isIdentical(e.target.value);
                        setInputVal((prevState) => ({
                          ...prevState,
                          newPassword: e.target.value
                        }));
                      }}
                    />

                    <PasswordEyeWrapper
                      onClick={() =>
                        newPasswordType == "password"
                          ? setNewPasswordType("text")
                          : setNewPasswordType("password")
                      }>
                      <PasswordEye />
                    </PasswordEyeWrapper>
                  </div>

                  <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                    <label>Confirm Password</label>
                    {/* <Field
                      type={confirmPasswordType}
                      name="confirmPassword"
                      placeholder="Repeat new password"
                      component={InputField}
                      onChange={(e) => {
                        validatePassword(e.target.value);
                      }}
                    /> */}

                    <input
                      type={confirmPasswordType}
                      placeholder="Repeat new password"
                      name="confirmPassword"
                      onChange={(e) => {
                        setFieldValue("confirmPassword", e.target.value);
                        setInputVal((prevState) => ({
                          ...prevState,
                          confirmPassword: e.target.value
                        }));
                      }}
                    />

                    <PasswordEyeWrapper
                      onClick={() =>
                        confirmPasswordType == "password"
                          ? setConfirmPasswordType("text")
                          : setConfirmPasswordType("password")
                      }>
                      <PasswordEye />
                    </PasswordEyeWrapper>
                  </div>

                  <PasswordRequirement>
                    <p>Password requirements :</p>
                    <div>
                      <ul>
                        <li className={passed?.min8 && "active"}>
                          {" "}
                          {passed?.min8 ? <Check /> : <Dot />} Min. 8 characters
                        </li>
                        <li className={passed?.lowercase && "active"}>
                          {" "}
                          {passed?.lowercase ? <Check /> : <Dot />} Include lowercase characters
                        </li>
                        <li className={passed?.uppercase && "active"}>
                          {" "}
                          {passed?.uppercase ? <Check /> : <Dot />} Include uppercase characters
                        </li>
                        <li className={passed?.special && "active"}>
                          {" "}
                          {passed?.special ? <Check /> : <Dot />} Include special characters
                        </li>

                        <li className={passed?.numbers && "active"}>
                          {" "}
                          {passed?.numbers ? <Check /> : <Dot />} Include numbers
                        </li>
                      </ul>

                      <ul>
                        <li className={passed === 1 && "active"}>
                          <Dot /> Different than previous passwords
                        </li>
                        <li className={passed?.consecutive && "active"}>
                          {" "}
                          {passed?.consecutive ? <Check /> : <Dot />} Don’t use identical characters
                        </li>
                        <li className={passed?.consecutive && "active"}>
                          {passed?.consecutive ? <Check /> : <Dot />} Don’t use consecutive
                          characters
                        </li>
                        <li className={passed === 1 && "active"}>
                          {" "}
                          <Dot /> Don’t use username or email
                        </li>
                        <li className={passed === 1 && "active"}>
                          {" "}
                          <Dot /> Don’t use common passwords
                        </li>
                      </ul>
                    </div>
                  </PasswordRequirement>

                  <div className="btn-wrapper">
                    <PublicButton textcard={"Set new password"} />
                  </div>
                </Form>
              )}></Formik>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}

const PasswordRequirement = styled.div`
  width: 100%;
  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */
    margin: 16px 0;
    color: #101010;
  }
  div {
    display: flex;
    justify-content: space-between;
    ul {
      list-style: none;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.01em;
      color: #4b5563;
    }

    ul li:before {
      /* content: "✓"; */
      ${"" /* content: "•"; */}
      margin: 0 5px;
    }
  }
  .active {
    color: #22b85f !important;
  }
`;
