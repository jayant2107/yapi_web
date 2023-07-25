import React from "react";
import styled from "styled-components";
// import ResponsiveHeader from "./ResponsiveHeader";
import PropTypes from "prop-types";
import ManageGoogleAccount from "./ManageGoogleAccount";

export const ProfileMobileView = ({ setProfileDrawer }) => {
  return (
    
    <ProfileMobileViewWrapper>
      {/* <ResponsiveHeader isRecording={false} /> */}

      <div className="content">
        <ManageGoogleAccount backArrow={true} setProfileDrawer={setProfileDrawer} />
      </div>
    </ProfileMobileViewWrapper>
  );
};

ProfileMobileView.propTypes = { 
  setProfileDrawer: PropTypes.func
};
const ProfileMobileViewWrapper = styled.div`
  width: 100%;



  .content {
    position: relative;
    height: 80vh;
    display: flex;
  align-items: center;
  }

  .ant-drawer-content {
    border-radius: 0px 0px 0px 0px !important;
    background: red;
    box-shadow: 0px -2px 14px rgba(0, 0, 0, 0.15) !important;
    height: 456px;
  }
`;
