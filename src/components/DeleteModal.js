import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const DeleteModal = ({
  open,
  handleClose,
  title,
  description,
  button,
  btnColor,
  handleSubmit,
  isLoading
}) => {
  return (
    <div>
      <Modal open={open} centered width={448} footer={false} onCancel={handleClose}>
        <DeleteModalWrapper>
          <div className="title">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="btns">
            <button onClick={handleClose} className="cancel">
              Cancel
            </button>
            {isLoading ? (
              <span className="delete">Loading...</span>
            ) : (
              <button
                onClick={handleSubmit ? handleSubmit : handleClose}
                style={{ background: btnColor }}
                className="delete">
                {button}
              </button>
            )}
          </div>
        </DeleteModalWrapper>
      </Modal>
    </div>
  );
};
DeleteModal.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.string,
  btnColor: PropTypes.string,
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool
};

const DeleteModalWrapper = styled.div`
  width: 100%;
  margin: 36px 0 12px 0;

  .title {
    width: 100%;
    padding: 0 25px;

    h2 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      color: #101010;
    }

    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #4b5563;
      margin-top: 8px;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 24px;

    span {
      height: 44px;
      padding: 0 24px;
      border-radius: 100px;
      border-style: none;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cancel {
      width: 96px;
      height: 44px;
      background: #eaeaea;
      border-radius: 100px;
      border-style: none;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      color: #101010;
    }
    .delete {
      height: 44px;
      padding: 0 24px;
      border-radius: 100px;
      border-style: none;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
    }
  }
`;
