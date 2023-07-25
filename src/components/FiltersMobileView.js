import React from "react";
import styled from "styled-components";
import ResponsiveHeader from "./ResponsiveHeader";
import { FiltersBox } from "./Filters";
import PropTypes from "prop-types";

export const FiltersMobileView = ({ setFilterDrawer }) => {
  return (
    <FiltersMobileViewWrapper>
      <ResponsiveHeader isRecording={false} />

      <div className="content">
        <FiltersBox backArrow={true} setFilterDrawer={setFilterDrawer} />
      </div>
    </FiltersMobileViewWrapper>
  );
};

FiltersMobileView.propTypes = {
  setFilterDrawer: PropTypes.func
};
const FiltersMobileViewWrapper = styled.div`
  width: 100%;

  .content {
    position: relative;
  }

  .ant-drawer-content {
    border-radius: 0px 0px 0px 0px !important;
    background: red;
    box-shadow: 0px -2px 14px rgba(0, 0, 0, 0.15) !important;
    height: 456px;
  }
`;
