import { useState } from "react";

export default function ControlPanel({
  onStart,
  onStop,
  onPause,
  onResume,
  onDownload,
  canDownload,
  volume = 0,
  fps = 60,
  recording = false,
}) {
  const [mic, setMic] = useState(60);
  const [noise, setNoise] = useState(true);
  const [theme, setTheme] = useState("light");
  const [speed, setSpeed] = useState(1);
  const [bassBoost, setBassBoost] = useState(false);
  const [trebleBoost, setTrebleBoost] = useState(false);

  return (
    <div className={`control-card ${theme}`}>
      {/* Live Transcription */}
      <div className="transcription-box">
        <h3>Live Transcription</h3>
        <p>Real-time transcription of audio appears here.</p>
      </div>

      {/* Control Buttons */}
      <div className="button-row">
        <button
          className="btn start"
          onClick={() => {
            onStart();
          }}
        >
          Start
        </button>
        <button
          className="btn stop"
          onClick={() => {
            onStop();
          }}
        >
          Stop
        </button>
        <button className="btn dark" onClick={onPause}>
          Pause
        </button>
        <button className="btn dark" onClick={onResume}>
          Resume
        </button>
      </div>

      <div className="button-row">
        <button
          className="btn dark"
          disabled={!canDownload}
          onClick={onDownload}
        >
          Download
        </button>
      </div>

      {/* Mic Settings */}
      <div className="setting">
        <label>Mic Sensitivity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={mic}
          onChange={(e) => setMic(e.target.value)}
        />
      </div>

      <div className="setting toggle">
        <span>Noise Suppression</span>
        <div
          className={`switch ${noise ? "on" : ""}`}
          onClick={() => setNoise(!noise)}
        >
          <div className="knob" />
        </div>
      </div>

      {/* Extra Settings */}
      <div className="extra-settings">
        <div className="setting toggle">
          <span>Bass Boost</span>
          <div
            className={`switch ${bassBoost ? "on" : ""}`}
            onClick={() => setBassBoost(!bassBoost)}
          >
            <div className="knob" />
          </div>
        </div>
      </div>
    </div>
  );
}
