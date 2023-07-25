import React, { useMemo, useState } from "react";
import { ForgetWrapper } from "../Forget/ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { useSelector } from "react-redux";
// import { loginUser } from "../../../services/Collections";
// import { message } from "antd";
// import { sagaLoginActions } from "./SagaAction";
// import { useDispatch, useSelector } from "react-redux";
// import { SignInStep } from "./SignInSlice";

export default function SignInWithEmail() {
  const [loading, setLoading] = useState(false);
  const RememberMeCredentials = useSelector((state) => state?.LoginSlice?.rememberMe);
  const navigate = useNavigate();
  // const dispatch = useDispatch();


  const initialValues = useMemo(() => {
    if (RememberMeCredentials) {
      return {
        email: RememberMeCredentials ? RememberMeCredentials?.email : "",
        password: RememberMeCredentials ? RememberMeCredentials?.password : ""
      };
    } else {
      return {
        email: "",
        password: ""
      };
    }
  }, [RememberMeCredentials]);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be a valid email").required("Email is required"),
  });

  // const handleNavigation = (data) => {
  //   if (data?.profileStatus == 3) {
  //     navigate("/private-layout/dashboard");
  //   } else if (data?.profileStatus == 0) {
  //     navigate("/connect-servicetitan");
  //   } else if (data?.profileStatus == 1) {
  //     navigate("/connect-slack");
  //   } else if (data?.profileStatus == 2) {
  //     navigate("select-lenders");
  //   }
  // };

  // const LoginCalling = async (requestPayload) => {
  //   let res = await loginUser(requestPayload);
  //   if (res?.status === 200) {
  //     setLoading(false);
  //     message.success(res?.message);
  //     handleNavigation(res?.data);
  //     let tempObject = { ...res?.data, token: res?.token };
  //     dispatch(SignInStep(tempObject));
  //   } else {
  //     setLoading(false);
  //     message.error(
  //       res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
  //     );
  //   }
  // };

  const handleForm = () => {
    setLoading(false);
    navigate("/congratulation");
    // setLoading(true);
    // let requestPayload = {
    //   email: val?.email,
    //   password: val?.password
    // };

    // dispatch({ type: sagaLoginActions.AUTH_LOGIN_SAGA, payload: { requestPayload, LoginCalling } });
  };


  const FormikFieldValues = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      component: InputField,
      eyeComponent: null
    },
  ];


  return (
    <ForgetWrapper>
      <section style={{ padding: "30px 0px 0px 0px" }}>
        <img src={AppLogo} />
        <div>
          <header>Log in</header>
          <subheader>Sign in to start the communications with your mates</subheader>
          <div className="inner-Section">
            <Formik
              isInitialValid={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleForm}
              render={() => (
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

                  <div className="btn-wrapper" style={{ marginBottom: "15px" }}>
                    <PublicButton textcard={"Sign in"} isLoading={loading} />
                  </div>
                  <NewAccount>
                    <subheader className="">
                      Don’t have an account? 
                      <span style={{ marginLeft: "5px" }} >
                        <u>Sign up</u>
                      </span>
                    </subheader>
                  </NewAccount>
                </Form>
              )}
            />
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}

const NewAccount = styled.div`
  width: 100%;
  text-align: center;

  span {
    cursor: pointer;
  }
`;
