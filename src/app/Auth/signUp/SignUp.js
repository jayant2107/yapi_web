import React, { useState } from "react";
import { ForgetWrapper, PasswordEyeWrapper } from "../Forget/ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import { useNavigate } from "react-router";
import { PasswordEye } from "../../../utils/Icons/SvgIcons";
import SignInWithGoogle from "../../../components/SignInWithGoogle";
import { LoginWithOr } from "../../../components/LoginWithOr";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { SignupWithGoogle, signupUser } from "../../../services/Collections";
import { message } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import { verifyGoogleToken } from "../../../components/VerifyGoogleToken";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };
  console.log(yup);
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must be a valid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Min. 8 characters")
      .max(32, "Max. 32 characters")
      .matches(/[a-z]/, "Include lowercase characters")
      .matches(/[A-Z]/, "Include uppercase characters")
      .matches(/[0-9]/, "Include numbers")
      .matches(/[$&+,:;=?@#|'<>.-^*()%!]/, "Include special characters")
      .required("Password is required")
  });

  const handleForm = async (values) => {
    setLoading(true);
    let object = {
      header: "Mail is sent to your account",
      subheader: `An email has been sent to ${values?.email} with a link to verify your account. If you have not received the email after a few mintues, please check your spam folder`
    };

    let requestPayload = {
      name: values?.name,
      email: values?.email,
      password: values?.password
    };
    console.log(requestPayload);

    let res = await signupUser(requestPayload);
    if (res.status === 200) {
      setLoading(false);
      navigate("/congratulation", { state: object });
    } else {
      setLoading(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };
  const handleNavigation = (data) => {
    if (data?.profileStatus == 3) {
      navigate("/private-layout/dashboard");
    } else if (data?.profileStatus == 0) {
      navigate("/connect-servicetitan");
    } else if (data?.profileStatus == 1) {
      navigate("/connect-slack");
    } else if (data?.profileStatus == 2) {
      navigate("select-lenders");
    }
  };

  const handleGoogleSignUp = async (payload) => {
    setLoading(true);

    let res = await SignupWithGoogle(payload);
    if (res?.status === 200) {
      console.log(res?.data, "data");
      message.success(res?.message);
      handleNavigation(res?.data);
      setLoading(false);
    } else {
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      verifyGoogleToken(tokenResponse, handleGoogleSignUp);
    }
  });

  const FormikFieldValues = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      component: InputField,
      eyeComponent: null
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      component: InputField,
      eyeComponent: null
    },
    {
      label: "Password",
      name: "password",
      type: passwordType,
      placeholder: "Enter your password",
      component: InputField,
      eyeComponent: (
        <PasswordEyeWrapper
          onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}>
          <PasswordEye />
        </PasswordEyeWrapper>
      )
    }
  ];

  return (
    <ForgetWrapper>
      <section style={{ padding: "30px 0px 0px 0px" }}>
        <img src={AppLogo} />
        <div>
          <header>Sign up</header>
          <subheader>Sign up to an awesome CxC account</subheader>
          <div className="inner-Section">
            <Formik
              isInitialValid={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleForm}>
              <Form>
                {FormikFieldValues &&
                  FormikFieldValues?.map((field) => (
                    <div
                      key={field?.name}
                      style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                      <label>{field?.label}</label>
                      <Field
                        name={field?.name}
                        type={field?.type}
                        placeholder={field?.placeholder}
                        component={field?.component}
                      />
                      {field?.eyeComponent}
                    </div>
                  ))}

                <div className="btn-wrapper">
                  <PublicButton textcard={"Verify"} isLoading={loading} />
                </div>
                <div className="login-with">
                  <LoginWithOr />
                </div>
                <div style={{ marginBottom: "30px" }} className="sign-with">
                  {" "}
                  <div onClick={() => login()}>
                    <SignInWithGoogle text={"Sign up with Google"} />
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}
