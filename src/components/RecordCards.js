import React from "react";
import { PlayArrow, RecordingDate, RecordingLength, SoldValue } from "../utils/Icons/SvgIcons";
import { DummyProfile } from "../utils/Images/Images";
import { useNavigate } from "react-router-dom";

export const RecordCards = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/private-layout/record-details");
  };
  return (
    <div className="cardWrapper" onClick={handleSubmit}>
      <div className="audioPlayDiv">
        <div className="playArrowDiv">
          <PlayArrow className="PlayGrayBtn" />
        </div>
        <h1>AUD_4569</h1>
        <button>Good</button>
      </div>
      <div className="cardInfo">
        <ul>
          <li>Technician</li>
          <li className="forGray1">
            {" "}
            <img src={DummyProfile} alt="" /> Talan George
          </li>
          <li>Length of recording</li>
          <li className="forGray">
            <RecordingLength /> 15:37:15
          </li>
        </ul>
        <ul>
          <li>Recording creation date</li>
          <li className="forGray1">
            <RecordingDate /> 01/03/2023
          </li>
          <li>Sold value</li>
          <li className="forGray">
            <SoldValue /> $5000
          </li>
        </ul>
      </div>
    </div>
  );
};
