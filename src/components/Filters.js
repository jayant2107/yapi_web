import React, { useState } from "react";
import styled from "styled-components";
import { BackArrow, DownArrow, SortIcon } from "../utils/Icons/SvgIcons";
import { DatePicker, Select } from "antd";
import useWindowWidth from "../customHook/GetWindowWidth";
import PropTypes from "prop-types";

export const FiltersBox = ({ backArrow, setFilterDrawer }) => {
  const [sortText, setSortText] = useState("Sort A to Z");
  const [width] = useWindowWidth();
  const options = [
    {
      value: "Under 15 minutes"
    },
    {
      value: "Under 30 minutes"
    },
    {
      value: "Under 45 minutes"
    },
    {
      value: "Under 1 hour"
    }
  ];

  const options2 = [
    {
      value: "$0 - $100"
    },
    {
      value: "$100 - $200"
    },
    {
      value: "$200 - $300"
    },
    {
      value: "$300 - $400"
    }
  ];
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <FilterWrapper width={width}>
      <div className="title-section">
        {backArrow && (
          <div onClick={() => setFilterDrawer(false)} style={{ cursor: "pointer" }}>
            <BackArrow />
          </div>
        )}
        <h3>Filter records</h3>
      </div>

      <section className="inner-section">
        <div className="input-wrap">
          <label>Recording length</label>

          <div className="input-section">
            <input type="text" value={sortText} disabled className="input" />

            <div
              className="img-icon"
              onClick={() =>
                setSortText(sortText === "Sort A to Z" ? "Sort Z to A" : "Sort A to Z")
              }>
              <SortIcon />
            </div>
          </div>
        </div>

        <div className="input-wrap">
          <label>Creation date</label>

          <div className="input-section">
            <DatePicker
              allowClear={false}
              placement="bottomRight"
              className="input"
              format={dateFormatList}
            />
          </div>
        </div>

        <div className="input-wrap">
          <label>Recording length</label>

          <div className="input-section">
            <Select
              style={{
                width: "100%"
              }}
              value={"Under 15 minutes"}
              suffixIcon={null}
              //   onChange={handleChange}
              tokenSeparators={[","]}
              options={options}
            />
            <div className="img-icon">
              <DownArrow />
            </div>
          </div>
        </div>

        <div className="input-wrap">
          <label>Sold Value</label>

          <div className="input-section">
            <Select
              style={{
                width: "100%"
              }}
              value={"$0 - $100"}
              suffixIcon={null}
              tokenSeparators={[","]}
              options={options2}
            />
            <div className="img-icon">
              <DownArrow />
            </div>
          </div>
        </div>

        <div className="btns-wrapper">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-apply">Apply</button>
        </div>
      </section>
    </FilterWrapper>
  );
};

FiltersBox.propTypes = {
  backArrow: PropTypes.bool,
  setFilterDrawer: PropTypes.func
};

const FilterWrapper = styled.div`
  width: ${({ width }) => (width > 500 ? "344px" : "100%")};
  height: ${({ width }) => (width > 500 ? "504px" : "100%")};
  padding: 13px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #101010;
    border-radius: 10px;
  }

  @media (max-height: 660px) {
    height: ${({ width }) => (width > 500 ? "440px" : "100%")};
  }
  .title-section {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #101010;
    }
  }

  .inner-section {
    width: 100%;

    .input-wrap {
      margin-top: 16px;
      display: flex;
      flex-direction: column;

      label {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #101010;
      }

      .input {
        margin-top: 8px;
        background: #f5f6f7;
        border-radius: 500px;
        padding: 15px;
        border-style: none;
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        width: 100%;
        margin-bottom: 0;
      }

      .input-section {
        position: relative;
        width: 100%;
      }

      .img-icon {
        position: absolute;
        right: 20px;
        top: 25px;
        cursor: pointer;
      }
    }

    .btns-wrapper {
      display: flex;
      gap: 12px;
      margin-top: 24px;

      .btn-cancel {
        border-style: none;
        width: 48%;
        height: 48px;
        background: #f5f5f5;
        border-radius: 100px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #101010;
      }
      .btn-apply {
        border-style: none;
        width: 48%;
        height: 48px;
        background: #000000;
        border-radius: 100px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #ffff;
      }
    }
  }
`;
