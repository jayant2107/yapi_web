import React from "react";
import styled from "styled-components";
import { NewWorkSpace } from "../../utils/Images/Images";

export default function AcceptInvitation() {
  return (
    <AcceptInvitationWrapper>
      <section>
        <div>
          <div className="image-container"> <img src={NewWorkSpace} /></div>
          <h1>Create a new Workspace</h1>
          <h4> Yapi team is - a place where they can talk and work together. To create a new team click on the button </h4>
        </div>

        <div>Accept Invitation</div>
      </section>
    </AcceptInvitationWrapper>
  );
}

const AcceptInvitationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    width: 60%;
    height: 505px;
    background: #fff;
    display: flex;
    padding: 0 30px;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;

      .image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 225px;
          height: 222px;
        }
      }

      h1 {
        color: #3d3d3d;
        font-family: "Inter";
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 136%;
        padding: 16px 0;
        text-align: start;
      }

      h4 {
        color: #8f8f8f;
        font-family: "Inter";
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
      }
    }
  }
`;
