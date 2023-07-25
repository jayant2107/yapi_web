import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AdminSettings, ManagerLogo, TechnicianLogo } from "../../../utils/Icons/SvgIcons";
import { PublicButton } from "../../../components/PublicButton";
import { AppLogo } from "../../../utils/Images/Images";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../utils/ErrorMessage";

export default function SignInMemberType() {
  const [signUpTypeActive, setSignUpTypeActive] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (signUpTypeActive == null) {
      setError(true);
    } else {
      setError(false);
      navigate("/sign-in-email");
    }
  };

  useEffect(() => {
    if (signUpTypeActive) setError(false);
  }, [signUpTypeActive]);

  console.log(signUpTypeActive, "signUpTypeActive");
  return (
    <SignInMemberTypeWrapper>
      <div className="parent-Wrapper">
        <div className="logo-container">
          <img src={AppLogo} alt="" />
        </div>
        <FormContainer>
          <div className="signin-title">
            <h3>Sign in</h3>
            <p>Sign in to visit your dashboards</p>
          </div>

          <div className="SignUpTypes-box">
            <div className="sign-types">
              <div className="logo-wrapper">
                <AdminSettings />
              </div>
              <div className="sign-role">
                <h4>I am an Admin</h4>
                <p>Want to manage account</p>
              </div>
              <div className="checkbox-container">
                <label className="container-checkbox">
                  <input
                    type="radio"
                    onChange={(e) => setSignUpTypeActive(e.target.value)}
                    value="1"
                    name="type"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="sign-types">
              <div className="logo-wrapper">
                <ManagerLogo />
              </div>
              <div className="sign-role">
                <h4>I am a Manager</h4>
                <p>Want to login my account</p>
              </div>
              <div className="checkbox-container">
                <label className="container-checkbox">
                  <input
                    type="radio"
                    onChange={(e) => setSignUpTypeActive(e.target.value)}
                    value="2"
                    name="type"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="sign-types">
              <div className="logo-wrapper">
                <TechnicianLogo />
              </div>
              <div className="sign-role">
                <h4>I am a Technician</h4>
                <p>Want to login my account</p>
              </div>
              <div className="checkbox-container">
                <label className="container-checkbox">
                  <input
                    type="radio"
                    onChange={(e) => setSignUpTypeActive(e.target.value)}
                    value="3"
                    name="type"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            {error && <ErrorMessage message={"Select sign-in type"} />}

            <div className="btn-wrapper">
              <PublicButton textcard={"Continue"} handleAction={handleSubmit} />
            </div>
          </div>
        </FormContainer>
      </div>
    </SignInMemberTypeWrapper>
  );
}

const SignInMemberTypeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .parent-Wrapper {
    width: 500px;

    @media (max-width: 1440px) {
      width: 75%;
    }
    @media (min-width: 480px) and (max-width: 834px) {
      margin-top: 67px;
      margin-bottom: 30px;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      width: 87%;
      margin-top: 40px;
      margin-bottom: 40px;
    }
  }

  .logo-container {
    width: 100%;

    img {
      width: 98px;
      height: 48px;
      margin-bottom: 80px;

      @media (min-width: 320px) and (max-width: 850px) {
        margin-bottom: 40px;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 33px;
      }
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;

  .signin-title {
    width: 100%;

    h3 {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 40px;
    }

    p {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #4b5563;
      padding-top: 10px;
    }
  }

  .SignUpTypes-box {
    width: 100%;
    margin-top: 20px;

    .sign-types {
      width: 100%;
      background: #ffff;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      margin-top: 13px;
      position: relative;

      .logo-wrapper {
        background: #f5f6f7;
        border-radius: 8px;
        padding: 11px 12px;
      }
    }

    .sign-role {
      h4 {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        color: #101010;
      }

      p {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #4b5563;
      }
    }

    .btn-wrapper {
      margin-top: 30px;
    }
  }

  .checkbox-container {
    position: absolute;
    right: 10px;
    .container-checkbox {
      display: block;
      position: relative;
      padding-left: 28px;
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
        top: 14px;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #transparent;
        border: 2.375px solid #858a96;
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
`;
