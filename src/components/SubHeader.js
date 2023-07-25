import { DatePicker, Drawer, Popover } from "antd";
import { checkPropTypes } from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import {
  BackArrow,
  DownArrow,
  Filters,
  IntegrationPlus,
  RecordingDate
} from "../utils/Icons/SvgIcons";
import useWindowWidth from "../customHook/GetWindowWidth";

import { FiltersMobileView } from "./FiltersMobileView";
import { useNavigate } from "react-router";
const { RangePicker } = DatePicker;

export default function SubHeader({
  headerName,
  isFilter,
  filterContent,
  backArrow,
  recordDetails,
  setOpenDrawer,
  isAddIntegration,
  isDateBtn
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
  const dateFormatList = ["DD/MM/YYYY"];

  console.log(isFilter, width, "drawer");

  return (
    <SubHeaderWrapper isDateBtn={isDateBtn}>
      <div className="title-header">
        <div onClick={handleBackButton}>{backArrow && <BackArrow />}</div>
        <header>{headerName}</header>
      </div>

      {isFilter && width > 500 && (
        <Popover placement="bottomLeft" trigger="click" content={filterContent}>
          <span>
            <Filters />
            Filter
            <DownArrow />
          </span>
        </Popover>
      )}

      {isAddIntegration && (
        <span className="integration">
          <IntegrationPlus />
          Add Integration
        </span>
      )}
      {isFilter && width <= 500 && (
        <>
          {/* <span onClick={() => setFilterDrawer(true)}> */}
          <span onClick={() => setFilterDrawer(true)}>
            <Filters />
            Filter
            <DownArrow />
          </span>
        </>
      )}
      {isDateBtn && (
        <>
          <div className="range-Picker-custom">
            <div className="icon-calender">
              <RecordingDate />
            </div>

            <label>
              <RangePicker
                size="24px"
                className="range-picker"
                suffixIcon={false}
                separator={<span>-</span>}
                style={{
                  width: "220px",
                  background: "transparent",
                  display: "flex",
                  justifyContent: "center"
                }}
                format={dateFormatList}
              />
            </label>
            <div className="icon-down">
              <DownArrow />
            </div>
          </div>
        </>
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

SubHeader.propTypes = {
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
  isDateBtn: checkPropTypes.bool
};

const SubHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isDateBtn }) => isDateBtn && "column"};

  margin: 24px 0 32px 0;
  padding: 0 16px;

  @media (min-width: 480px) and (max-width: 834px) {
    margin: 24px 0px 24px 0px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px 14px;
  }
  @media (min-width: 835px) {
    display: none;
  }

  .title-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .range-Picker-custom {
    width: 270px;
    position: relative;

    label {
      display: flex;
      flex-direction: row;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      padding: 0px 6px;
      background: rgb(232, 237, 243);
      border-radius: 68px;
      margin: 0px 8px;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      gap: 8px;
      color: rgb(75, 85, 99);
      cursor: pointer;
    }

    label {
      padding: 10px 0;
      text-align: center;

      span {
        padding: 0 5px;
      }
    }
    span {
      margin: 0;
      padding: 0;
    }
    .icon-calender {
      position: absolute;
      top: 9px;
      left: 23px;
      z-index: 9;
    }
    .icon-down {
      position: absolute;
      top: 11px;
      right: 23px;
      z-index: 9;
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
  .integration {
    @media (max-width: 480px) {
      margin-right: 16px;
    }
  }
`;
