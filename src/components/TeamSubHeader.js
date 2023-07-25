import { Drawer, Popover } from "antd";
import { checkPropTypes } from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { BackArrow, DownArrow, Filters, IntegrationPlus } from "../utils/Icons/SvgIcons";
import useWindowWidth from "../customHook/GetWindowWidth";

import { FiltersMobileView } from "./FiltersMobileView";
import { useNavigate } from "react-router";
import MoreButtons from "../module/team/MoreButtons";

export default function TeamSubHeader({
  headerName,
  isFilter,
  filterContent,
  backArrow,
  recordDetails,
  setOpenDrawer,
  isAddIntegration,
  isMoreBtns,
  teamRowSelected
}) {
  const [width] = useWindowWidth();
  const navigate = useNavigate();
  const [openDrawer, setFilterDrawer] = useState(false);

  const handleBackButton = () => {
    if (width > 500) {
      navigate(-1);
    } else if (width <= 500) {
      setFilterDrawer(false);
    }
  };

  return (
    <SubHeaderWrapper>
      <div className="title-header">
        <div className="title-wrapper">
          <div onClick={handleBackButton}>{backArrow && <BackArrow />}</div>
          <header>{headerName}</header>
        </div>
        {isFilter &&
          Array.isArray(teamRowSelected) &&
          teamRowSelected.length == 0 &&
          width > 500 && (
            <Popover placement="bottomLeft" trigger="click" content={filterContent}>
              <span>
                <Filters />
                Filter
                <DownArrow />
              </span>
            </Popover>
          )}
        {isFilter &&
          Array.isArray(teamRowSelected) &&
          teamRowSelected.length == 0 &&
          width <= 500 && (
            <>
              {/* <span onClick={() => setFilterDrawer(true)}> */}
              <span onClick={() => setFilterDrawer(true)}>
                <Filters />
                Filter
                <DownArrow />
              </span>
            </>
          )}
      </div>

      {isAddIntegration && (
        <span>
          <IntegrationPlus />
          Add Integration
        </span>
      )}
      {isMoreBtns && Array.isArray(teamRowSelected) && teamRowSelected?.length > 0 && (
        <MoreButtons />
      )}

      {openDrawer && (
        <Drawer
          className="filter-drawer"
          placement="right"
          closable={false}
          onClose={() => setFilterDrawer(false)}
          open={openDrawer}
          width={"100%"}
          key="bottom">
          <FiltersMobileView setFilterDrawer={setFilterDrawer} />
        </Drawer>
      )}
      {recordDetails && width <= 500 && <span onClick={() => setOpenDrawer(true)}>Transcript</span>}
    </SubHeaderWrapper>
  );
}

TeamSubHeader.propTypes = {
  headerName: checkPropTypes.string,
  isFilter: checkPropTypes.bool,
  filterContent: checkPropTypes.func,
  backArrow: checkPropTypes.bool,
  handleRecording: checkPropTypes.func,
  isRecording: checkPropTypes.bool,
  recordDetails: checkPropTypes.bool,
  setOpenDrawer: checkPropTypes.func,
  openDrawer: checkPropTypes.bool,
  isAddIntegration: checkPropTypes.bool,
  isMoreBtns: checkPropTypes.bool,
  teamRowSelected: checkPropTypes.array
};

const SubHeaderWrapper = styled.div`
  width: 100%;
  margin: 24px 0 32px 0;
  padding: 0 16px;

  @media (min-width: 480px) and (max-width: 834px) {
    margin: 24px 0px 24px 0px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px;
  }
  @media (min-width: 835px) {
    display: none;
  }

  .title-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px 0 0;

    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }

  header {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #101010;
    margin-right: 8px;

    @media (max-width: 500px) {
      font-size: 23px;
    }
  }
  span {
    display: flex;
    width: 150px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    background: #e8edf3;
    border-radius: 68px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    gap: 8px;
    color: #4b5563;
    cursor: pointer;
  }

  .filter-drawer {
    width: 100%;
  }
`;
