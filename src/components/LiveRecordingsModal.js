import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DummyProfile } from "../utils/Images/Images";
import Waveform from "./WavesAudio";

export const LiveRecordingsModal = ({ open, handleModal }) => {
  return (
    <div>
      <Modal open={open} centered width={609} footer={false} onCancel={handleModal}>
        <LiveRecordingWrapper>
          <div className="title">
            <h3>Live Recordings</h3>
          </div>

          <div className="content">
            <div style={{ borderBottom: "1px solid #e5e7eb" }} className="flex-wrap">
              <div className="name-section">
                <img src={DummyProfile} alt="" />
                <h1>Adam Smith</h1>
              </div>

              <div className="player-box">
                <Waveform
                  audioUrl={
                    "https://aqlutprodstoragmain.blob.core.windows.net/publicaqlut/notificationSound.mp3"
                  }
                  height={40}
                />
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #e5e7eb" }} className="flex-wrap">
              <div className="name-section">
                <img src={DummyProfile} alt="" />
                <h1>Adam Smith</h1>
              </div>

              <div className="player-box">
                <Waveform
                  audioUrl={
                    "https://aqlutprodstoragmain.blob.core.windows.net/publicaqlut/notificationSound.mp3"
                  }
                  height={40}
                />
              </div>
            </div>
            <div className="flex-wrap">
              <div className="name-section">
                <img src={DummyProfile} alt="" />
                <h1>Adam Smith</h1>
              </div>

              <div className="player-box">
                <Waveform
                  audioUrl={
                    "https://aqlutprodstoragmain.blob.core.windows.net/publicaqlut/notificationSound.mp3"
                  }
                  height={40}
                />
              </div>
            </div>
          </div>
        </LiveRecordingWrapper>
      </Modal>
    </div>
  );
};

LiveRecordingsModal.propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func
};

const LiveRecordingWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;

  .title {
    width: 100%;

    h3 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #101010;
    }
    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #4b5563;
      padding-top: 8px;
    }
  }

  .content {
    width: 100%;
    margin-top: 35px;

    .flex-wrap {
      display: flex;
      gap: 38px;
      align-items: center;
      height: 75px;

      @media (max-width: 500px) {
        display: block;
        height: max-content;
        margin-top: 10px;
      }

      .name-section {
        display: flex;
        gap: 8px;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        h1 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #4b5563;
          white-space: nowrap;
        }
      }

      .player-box {
        width: 100%;
        margin: 24px 0;
        display: flex;
        gap: 10px;
        align-items: center;

        @media (max-width: 500px) {
          padding: 10px 0;
          margin: 0;
          gap: 10px;
        }

        span {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #4b5563;
        }

        .playBtn-box {
          width: 10%;

          button {
            background: rgba(61, 151, 242, 0.1);
            border-radius: 50%;
            width: 42px;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-style: none;
            cursor: pointer;

            @media (max-width: 500px) {
              width: 35px;
              height: 35px;
            }
          }
        }

        .waves-box {
          width: 90%;

          @media (max-width: 500px) {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;
