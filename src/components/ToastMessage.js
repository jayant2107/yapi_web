import React from "react";
import PropTypes from "prop-types";
import { notification } from "antd";

export default function ToastMessage({ openNotification }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: openNotification,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification."
    });
  };

  openNotificationWithIcon();

  return (
    <div>
      {" "}
      {contextHolder}
      adcmdkcds
    </div>
  );
}

ToastMessage.propTypes = {
  openNotification: PropTypes.string
};
