import React, { useState } from "react";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import BackButton from "../../../components/BackButton";
import { ForgetWrapper } from "./ForgetStyle";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { forgotPassword } from "../../../services/Collections";
import { message } from "antd";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const initialValues = {
    email: ""
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be a valid email").required("Email is required")
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let obj = {
      email: values?.email
    };
    let res = await forgotPassword(obj);
    if (res?.status === 200) {
      navigate("/check-mail");
      setLoading(false);
    } else {
      setLoading(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  return (
    <ForgetWrapper>
      <section>
        <img src={AppLogo} />
        <div>
          <header>Forgot password?</header>
          <subheader>No worries, we’ll send you reset instructions</subheader>
          <div className="inner-Section">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Form>
                <label>Email</label>
                {/* <input type="email" placeholder="Enter your email address" /> */}
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  component={InputField}
                />
                <div className="btn-wrapper">
                  <PublicButton textcard={"Send link to Email"} isLoading={loading} />
                </div>
                <div className="goBackDiv">
                  <BackButton textcard={"Go back to sign in"} handleAction={-1} />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}
