import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
const LoadingSpinner = (prop) => {
  const visible = prop.visible;
  /*var Loader = require('react-loader');
  var options = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    scale: 1.0,
    corners: 1,
    color: '#000',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute',
  };
  
  return (
    //   <ProgressSpinner
    //     style={{ width: '100%', height: '100%' }}
    //     strokeWidth="8"
    //     className="spinner"
    //     fill="var(--surface-ground)"
    //     animationDuration="5.0s"
    //   />
    <Loader loaded={!visible} options={options} className="spinner"></Loader>
  );*/
  return (
    <>
      {visible && (
        // <div className="loading">Loading</div>
        <div className="spinner-container">
          <div className="waveform">
            <div className="waveform__bar"></div>
            <div className="waveform__bar"></div>
            <div className="waveform__bar"></div>
            <div className="waveform__bar"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
