import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  BackArrow,
  BillNotification,
  DownArrow,
  Filters,
  IntegrationPlus,
  RecordingDate,
  Search
} from "../utils/Icons/SvgIcons";
import { DatePicker, Popover } from "antd";
import PropTypes from "prop-types";
import ManageGoogleAccount from "./ManageGoogleAccount";
import { DummyProfile, Recording } from "../utils/Images/Images";
// import ClickAwayListener from "react-click-away-listener";
import { Notification } from "./Notification";
import { useLocation } from "react-router-dom";
const { RangePicker } = DatePicker;

export default function CxcHeader({
  headerName,
  isFilter,
  filterContent,
  backArrow,
  isRecording,
  handleRecording,
  isDateBtn,
  typeIs,
  headerName2,
  setType,
  isAddIntegration,
  recordingCount
}) {
  const [showSearch, setShowSearch] = useState(false);
  const datePickerRef = useRef(null);
  const [handleProfilePopup, setHandleProfilePopup] = useState(false);
  const location = useLocation();

  console.log(location, "location");

  function handleClickDatepicker() {
    if (datePickerRef.current) {
      console.log(datePickerRef, "SDbjbvdjfbvjdbvjh");
    }
  }
  const SearchPopup = () => {
    return (
      <SearchWrapper>
        <input type="text" placeholder="Search" className="input" />
      </SearchWrapper>
    );
  };

  // const handleClickAway = () => {
  //   setHandleProfilePopup(false);
  // };
  const dateFormatList = ["DD/MM/YYYY"];

  return (
    <HeaderWrapper>
      <div className="right-properties">
        <div className="title-header">
          {backArrow && <BackArrow />}
          <header>
            {typeIs === 3 ? (
              <p onClick={() => setType(4)}>
                <BackArrow />
              </p>
            ) : (
              ""
            )}
            {typeIs === 3 ? headerName2 : headerName}
          </header>
        </div>

        {isFilter && (
          <Popover placement="bottomLeft" trigger="click" content={filterContent}>
            <span>
              <Filters />
              Filter
              <DownArrow />
            </span>
          </Popover>
        )}
        {isAddIntegration && (
          <span>
            <IntegrationPlus />
            Add Integration
          </span>
        )}

        {isDateBtn && (
          <>
            <div className="range-Picker-custom">
              <div className="icon-calender">
                <RecordingDate />
              </div>

              <label onClick={() => handleClickDatepicker()}>
                <RangePicker
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
      </div>

      <div className="left-properties">
        {isRecording && (
          <LiveRecording onClick={() => handleRecording(true)}>
            <img src={Recording} alt="" />
            <span>{recordingCount} people recording</span>
          </LiveRecording>
        )}
        {showSearch && <input type="text" placeholder="Search" />}
        {location?.pathname == "/private-layout/team" ? (
          <Popover placement="bottomLeft" trigger="click" content={<SearchPopup />}>
            <span>
              <Search />
            </span>
          </Popover>
        ) : (
          <span onClick={() => setShowSearch(!showSearch)}>
            <Search />
          </span>
        )}

        <Popover
          className="notification-custom"
          placement="bottomLeft"
          // getPopupContainer={(triggerNode) => triggerNode.parentNode}
          trigger="click"
          content={
            <div>
              <Notification />
            </div>
          }>
          <span>
            <BillNotification />
          </span>
        </Popover>

        <div>
          <Popover
            // getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placement="bottomLeft"
            trigger="click"
            open={handleProfilePopup}
            onOpenChange={setHandleProfilePopup}
            content={<ManageGoogleAccount backArrow={false} handlePopup={setHandleProfilePopup} />}>
            {/* <ClickAwayListener onClickAway={handleClickAway}> */}
            <img src={DummyProfile} onClick={() => setHandleProfilePopup(true)} />
            {/* </ClickAwayListener> */}
          </Popover>
        </div>
      </div>
    </HeaderWrapper>
  );
}

CxcHeader.propTypes = {
  headerName: PropTypes.string,
  isFilter: PropTypes.bool,
  filterContent: PropTypes.func,
  backArrow: PropTypes.bool,
  handleRecording: PropTypes.func,
  isRecording: PropTypes.bool,
  isDateBtn: PropTypes.bool,
  dateContent: PropTypes.func,
  typeIs: PropTypes.number,
  headerName2: PropTypes.string,
  setType: PropTypes.func,
  isMoreBtns: PropTypes.bool,
  isAddIntegration: PropTypes.bool,
  teamRowSelected: PropTypes.array,
  recordingCount: PropTypes.number
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;

  @media (max-width: 834px) {
    display: none;
  }

  .right-properties {
    width: 100%;
    display: flex;
    align-items: center;

    .range-Picker-custom {
      width: 270px;
      position: relative;

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
        z-index: 9999;
      }
      .icon-down {
        position: absolute;
        top: 11px;
        right: 23px;
        z-index: 9999;
      }
    }

    .title-header {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    header {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 38px;
      color: #101010;
      margin-right: 8px;
      display: flex;
      align-items: center;
      gap: 20px;

      p {
        display: flex;
        align-items: center;
      }
      svg {
        cursor: pointer;
      }

      @media (min-width: 320px) and (max-width: 480px) {
        font-size: 24px;
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
      ${"" /* margin: 0 8px; */}
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      gap: 8px;
      color: #4b5563;
      cursor: pointer;
    }

    label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0 6px;
      background: #e8edf3;
      border-radius: 68px;
      margin: 0 8px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      gap: 8px;
      color: #4b5563;
      cursor: pointer;
    }
  }

  .left-properties {
    display: flex;
    align-items: center;
    gap: 16px;
    svg {
      width: 20px;
      height: 20px;
    }

    span {
      cursor: pointer;
    }

    div {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
      }
    }

    input {
      width: 426px;
      padding: 10px 16px;
      background: #e8edf3;
      border-radius: 500px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      letter-spacing: -0.01em;
      color: #000;
      border-style: none;
    }
  }
`;

const LiveRecording = styled.button`
  width: 185px;
  height: 40px;
  background: #e8edf3;
  border-radius: 68px;
  display: flex;
  justify-content: center;
  gap: 9px;
  align-items: center;
  border-style: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #4b5563;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  background: #fff;

  input {
    width: 426px;
    padding: 10px 16px;
    background: #e8edf3;
    border-radius: 10px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.01em;
    color: #000;
    border-style: none;

    :focus {
      outline: none;
      border: 1px solid #cecece;
    }
  }
`;
