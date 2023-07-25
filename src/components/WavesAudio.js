/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";
import { PauseArrow, PlayArrow } from "../utils/Icons/SvgIcons";
import axios from "axios";

const Waveform = ({ audioUrl, height }) => {
  console.log("audioStatus", audioUrl);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setPlay] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#E6E6E6",
      progressColor: "#3D97F2",
      height: height,
      barWidth: 3,
      //url: "https://corsproxy.io/?https://d1xpnhso97nfox.cloudfront.net/algrasshopper/32/2023_07_05_07_11_50/621/621.wav",
      cursorWidth: 0,
      responsive: true
    });
    axios
      .get(`https://corsproxy.io/?https://d1xpnhso97nfox.cloudfront.net/${audioUrl}`, {
        responseType: "arraybuffer"
      })
      .then((response) => {
        wavesurferRef.current.loadBlob(new Blob([response.data]));
      })
      .catch((error) => {
        console.error("Error loading audio file:", error);
      });

    // Clean up the WaveSurfer instance when the component unmounts
    return () => wavesurferRef.current.destroy();
  }, []);

  const handlePlay = () => {
    if (wavesurferRef.current) {
      console.log(waveformRef.current, "sakchbsdhc");
      setPlay(!isPlaying);
      wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="player-box">
      <div className="playBtn-box">
        <button onClick={handlePlay}>
          {!isPlaying ? (
            <PlayArrow className="PlayBlueBtn" />
          ) : (
            <PauseArrow className="PlayBlueBtn" />
          )}
        </button>
      </div>
      <div className="waves-box">
        <div ref={waveformRef}></div>
      </div>
      <span>00:02:16</span>
    </div>
  );
};

export default Waveform;

Waveform.propTypes = {
  audioUrl: PropTypes.string,
  audioStatus: PropTypes.bool,
  height: PropTypes.number
};
