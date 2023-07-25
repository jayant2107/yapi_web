import { Pagination } from "antd";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const PaginationBox = ({ total, showSizeChanger, limit, onChange, current }) => {
  return (
    <PaginationWrapper>
      <Pagination
        current={current}
        total={total}
        showSizeChanger={showSizeChanger}
        defaultPageSize={limit}
        onChange={onChange}
        // borderRadius={50}
        borderRadiusLG
      />
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  width: calc(100% - 260px);
  margin-left: 260px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4b5563;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background: #f6f9fc;

  @media (max-width: 1440px) {
    margin-left: 200px;
    width: calc(100% - 200px);
  }

  @media (max-width: 834px) {
    width: 100%;
    margin-left: 0;
  }
`;

PaginationBox.propTypes = {
  total: PropTypes.number,
  showSizeChanger: PropTypes.boolean,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  current: PropTypes.number
};
