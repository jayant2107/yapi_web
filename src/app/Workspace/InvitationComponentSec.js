import React from "react";
import { Acceptinvitation } from "../../utils/Images/Images";
import { InvitationComponentWrapper } from "./InvitationComponent";

const InvitationComponentSec = () => {
  return (
    <InvitationComponentWrapper>
        <div className="image_wrapper">
            <img src={Acceptinvitation}/>
        </div>
        <h2>Accept Invitation</h2>
        <p>there are no invitation for <span>sulaman.abir@gmail.com</span> yet.</p>
    </InvitationComponentWrapper>
  );
};

export default InvitationComponentSec;