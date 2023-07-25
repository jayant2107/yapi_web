import React from "react";
import styled from "styled-components";
import { InvitationImg } from "../../utils/Images/Images";

const InvitationComponent = () => {
  return (
    <InvitationComponentWrapper>
      <h2>Accept Invitation</h2>
      <p>
        These invitations are for <span>sulaman.abir@gmail.com</span>
      </p>
      <div className="card_wrapper">
        <div className="img_wrapper">
          <img src={InvitationImg} alt="profilePic" />
        </div>
        <div>
          <h3>Cocomelon</h3>
          <h5>15 members</h5>
        </div>
        <button className="join_button">JOIN NOW</button>
      </div>
      <div className="see_more">See more</div>
    </InvitationComponentWrapper>
  );
};

export default InvitationComponent;

export const InvitationComponentWrapper = styled.div`
  font-family: Inter;
  h2 {
    color: #3d3d3d;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 136%;
  }
  p {
    margin: 16px 0 34px 0;
    color: #8f8f8f;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    span {
      color: #3d3d3d;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
    }
  }

  .card_wrapper {
    padding: 8px 0;
    display: grid;
    grid-template-columns: 56px auto 135px;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
  }

  .img_wrapper {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    color: #3d3d3d;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }
  h5 {
    color: #8f8f8f;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }

  .join_button {
    width: 135px;
    height: 44px;
    color: white;
    border-radius: 4px;
    background: #3d97f2;
    border: transparent;
  }
  .see_more {
    color: #3d97f2;
    font-family: Larsseit;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 136%;
    margin-top: 20px;
  }

  .image_wrapper {
    width: 100%;
    height: 204px;
    display: grid;
    justify-content: center;
    margin-bottom: 32px;
    img{
      width: 286px;
      height: 204px;
    }
  }
`;
