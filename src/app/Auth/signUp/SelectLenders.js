/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import React, { useState } from "react";
import { AppLogo, SelectLenderIcon } from "../../../utils/Images/Images";
import styled from "styled-components";
import { CreditCardIcon, DebitCardIcon } from "../../../utils/Icons/SvgIcons";
import { PublicButton } from "../../../components/PublicButton";
import BackButton from "../../../components/BackButton";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import ErrorMessage from "../../../utils/ErrorMessage";
import { StripePaymentMethod } from "../../../stripe/StripeFunction";
import { message } from "antd";
import { savedCardPaymentMethod } from "../../../services/Collections";
import { useDispatch, useSelector } from "react-redux";
import { SignInStep } from "../signIn/SignInSlice";
// import CreditCardForm from "./ValidTill";
export const SelectLenders = () => {
  const userDetails = useSelector((state) => state?.LoginSlice?.data);
  const dispatch = useDispatch();
  const [expiryDateError, setExpiryDateError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    cardType: "",
    name: "",
    cardNumber: "",
    validDate: "",
    cvc: ""
  };

  const validationSchema = yup.object().shape({
    cardType: yup.string().required("Select Card type"),
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    cardNumber: yup.string().required("Card number is required").min(16).max(16),
    validDate: yup.string().required("Date is required"),
    cvc: yup.string().required("CVC is required").min(3).max(4)
  });

  const handleSubmit = async (values) => {
    if (values) {
      setLoading(true);
      let result = await StripePaymentMethod(values);
      console.log(result, "resssssssss");
      if (result?.id) {
        let req = {
          paymentMethodId: result?.id
        };
        let res = await savedCardPaymentMethod(req);
        if (res?.status === 200) {
          let obj = {...userDetails, ...res?.data};
          dispatch(SignInStep(obj));
          setLoading(false);
          message.success(res?.message);
        } else {
          setLoading(false);
          message.error(
            res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
          );
        }
      } else {
        setLoading(false);
      }
    }
  };

  const formatString = (event, setFieldValue) => {
    var code = event.keyCode;
    var allowedKeys = [8];
    console.log(code, "inputChar", allowedKeys.indexOf(code));
    if (allowedKeys.indexOf(code) !== -1) {
      setFieldValue("validDate", "");
      setExpiryDateError("");
      return;
    } else {
      let formatDate = (event.target.value = event.target.value
        .replace(
          /^([1-9]\/|[2-9])$/g,
          "0$1/" // 3 > 03/
        )
        .replace(
          /^(0[1-9]|1[0-2])$/g,
          "$1/" // 11 > 11/
        )
        .replace(
          /^([0-1])([3-9])$/g,
          "0$1/$2" // 13 > 01/3
        )
        .replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
          "$1/$2" // 141 > 01/41
        )
        .replace(
          /^([0]+)\/|[0]+$/g,
          "0" // 0/ > 0 and 00 > 0
        )
        .replace(
          /[^\d\/]|^[\/]*$/g,
          "" // To allow only digits and `/`
        )
        .replace(
          /\/\//g,
          "/" // Prevent entering more than 1 `/`
        ));

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      const [month, year] = formatDate.split("/");
      if (
        parseInt(year, 10) < currentYear ||
        (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
      ) {
        setExpiryDateError("Card has expired");
        setFieldValue("validDate", "");
      } else {
        setExpiryDateError("");
        setFieldValue("validDate", formatDate);
      }
    }
  };

  return (
    <SelectLendersWrapper>
      <section>
        <img src={AppLogo} />
        <div className="stepsWrapper">
          <div className="img-box">
            <img src={SelectLenderIcon} alt="" />
          </div>
          <div className="step-name">
            <h4>Step 03:</h4>
            <p>Select Lenders</p>
          </div>
        </div>
        <div className="three-line-box">
          <div className="black"></div>
          <div className="black"></div>
          <div className="black"></div>
        </div>
        <div>
          <header>Setup</header>
          <subheader>You won’t be charged until you activate your account</subheader>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          render={({ errors, setFieldValue }) => (
            <Form>
              <div className="inner-part">
                <div className="multi-input-div">
                  <label className="inner-main-label">Card Type</label>
                  <div className="checkbox-inputs">
                    <div className="message-wrapper">
                      <div className="message-icon-div">
                        <CreditCardIcon />
                        <p>Credit Card</p>
                      </div>
                      <div className="checkbox-container">
                        <label className="container-checkbox">
                          <Field
                            type="radio"
                            name="cardType"
                            // onChange={(e) => setSignUpTypeActive(e.target.value)}
                            value="1"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div className="message-wrapper">
                      <div className="message-icon-div">
                        <DebitCardIcon />
                        <p>Debit Card</p>
                      </div>
                      <div className="checkbox-container">
                        <label className="container-checkbox">
                          <Field
                            type="radio"
                            name="cardType"
                            // onChange={(e) => setSignUpTypeActive(e.target.value)}
                            value="2"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.cardType ? <ErrorMessage message={errors?.cardType} /> : ""}
                </div>
                <div className="card-details">
                  <label className="detail-label">Card Details</label>
                  <div className="gapRow">
                    <label>Name on Card</label>
                    <Field
                      type="text"
                      className="detail-input"
                      name="name"
                      placeholder="Enter card name"
                      component={InputField}
                    />
                  </div>
                  <div className="gapRow">
                    <label>Card Number</label>
                    <Field
                      type="number"
                      className="detail-input"
                      name="cardNumber"
                      placeholder="Enter card number"
                      component={InputField}
                    />
                  </div>
                </div>
                <div className="valid-cvc">
                  <div className="gapRow">
                    <label>Valid till</label>
                    <input
                      name="validDate"
                      maxLength="5"
                      placeholder="MM/YY"
                      type="text"
                      onKeyUp={(event) => formatString(event, setFieldValue)}
                    />

                    {expiryDateError && <ErrorMessage message={expiryDateError} />}

                    {/* <CreditCardForm /> */}
                  </div>
                  <div className="gapRow">
                    <label>CVC Code</label>
                    <Field
                      type="password"
                      maxLength="3"
                      name="cvc"
                      placeholder="*****"
                      component={InputField}
                    />
                  </div>
                </div>
              </div>
              <div className="btn-wrapper">
                <PublicButton textcard={"Next"} isLoading={loading} />
              </div>
            </Form>
          )}></Formik>
        <div className="go-back-div">
          <BackButton textcard={"Go back"} handleAction={-1} />
        </div>
      </section>
    </SelectLendersWrapper>
  );
};

const SelectLendersWrapper = styled.div`
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
    margin-bottom: 30px;
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
      width: 100%;

      .black {
        width: 100%;
        border-bottom: 3px solid #101010;
      }
      .gray {
        width: 100%;
        border-bottom: 3px solid #b5bac0;
      }
    }

    .gapRow {
      margin-top: 13px;
    }

    .inner-part {
      .multi-input-div {
        margin-top: 34px;
        .inner-main-label {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #101010;
        }
        .checkbox-inputs {
          display: flex;
          padding: 0px;
          gap: 16px;
          margin-top: 14px;

          @media (max-width: 440px) {
            display: block;
          }

          .message-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            background: #ffffff;
            border-radius: 8px;
            padding: 0px 20px 0px 11.86px;
            width: 50%;

            @media (max-width: 440px) {
              width: 100%;
              margin-bottom: 12px;
            }
            .message-icon-div {
              display: flex;
              gap: 11px;
              align-items: center;
              height: 56px;
              p {
                font-family: "Inter";
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #4b5563;
                margin: 0px;
              }
            }

            .checkbox-container {
              position: absolute;
              right: 20px;
              .container-checkbox {
                display: block;
                position: relative;
                padding-left: 28px;
                margin-bottom: 24px;
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
                  background-color: #1a1b55;
                  border-style: none;
                }
                .checkmark {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 25px;
                  width: 25px;
                  background-color: #transparent;
                  border: 1.6px solid #d9e0e6;
                  border-radius: 50%;
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
                  top: 6px;
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
          }
        }
      }
      .card-details {
        .detail-label {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #101010;
          display: block;
          margin-top: 24px;
          margin-bottom: 16px;
        }
        label {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #101010;
          display: block;
          margin-bottom: 6px;
        }
        .detail-input {
          height: 52px;
          width: 100%;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #101010;
          background: #ffffff;
          border-radius: 8px;
          padding: 0px 15px;
          border: none;
          ${"" /* margin-bottom: 16px; */}

          :focus {
            outline: none;
          }
        }
      }
      .valid-cvc {
        display: flex;
        gap: 16px;
        div {
          width: 100%;
          label {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #101010;
            margin-bottom: 6px;
            display: block;
          }
          input {
            background: #ffffff;
            border-radius: 8px;
            height: 52px;
            padding: 0px 15px;
            width: 100%;
            border: none;
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;

            :focus {
              outline: none;
            }
          }
        }
      }
    }
    .btn-wrapper {
      margin-top: 32px;
      margin-bottom: 24px;
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
  }
`;
