import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import PropTypes from "prop-types";

export const ModalLoader = ({ size, color }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size,
        color: color
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} />;
};
ModalLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};
