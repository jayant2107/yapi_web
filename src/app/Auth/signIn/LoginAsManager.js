/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ForgetWrapper } from "../Forget/ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VerifyOtpAction } from "./SignInSlice";
import { message } from "antd";
import { loginInAsManager } from "../../../services/Collections";

export default function LoginAsManager() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: ""
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be a valid email").required("Email is required")
  });

  const handleForm = async (val) => {
    setLoading(true);
    console.log(val, "val");
    if (val) {
      let reqPayload = {
        email: val?.email
      };

      let res = await loginInAsManager(reqPayload);
      console.log(res, "resessss");
      if (res?.message === "OK" ) {
        dispatch(VerifyOtpAction(res?.data?.[0]));
        setLoading(false);
        navigate("/verify-otp");
      } else {
        message.error(
          res?.response?.data?.message || res?.message || res?.data?.error || "Something went wrong"
        );
        setLoading(false);
      }
    }
  };

  const FormikFieldValues = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      component: InputField,
      eyeComponent: null
    }
  ];

  return (
    <ForgetWrapper>
      <section style={{ padding: "30px 0px 0px 0px" }}>
        <img src={AppLogo} />
        <div>
          <header>Manager Login</header>
          <subheader>Sign in to visit your dashboards</subheader>
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
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column"
                        }}>
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
                </Form>
              )}
            />
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}
