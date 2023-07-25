import React from "react";
import { ForgetWrapper } from "./ForgetStyle";
import { AppLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import BackButton from "../../../components/BackButton";
import { useNavigate } from "react-router-dom";

export default function CheckMail() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    // navigate("/set-new-password");
    navigate("/");
  };
  return (
    <ForgetWrapper>
      <section>
        <img src={AppLogo} />
        <div>
          <header>Check your email</header>
          <subheader>We’ve sent a password reset link to redmond120@cxc.com</subheader>
          <div className="inner-Section">
            <div className="btn-wrapper">
              <PublicButton textcard={"Send link to Email"} handleAction={handleSubmit} />
            </div>
            <div>
              <BackButton textcard={"Go back to sign in"} handleAction={-1} />
            </div>
          </div>
        </div>
      </section>
    </ForgetWrapper>
  );
}
