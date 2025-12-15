import { useState } from "react";

export default function ControlPanel({
  onStart,
  onStop,
  onPause,
  onResume,
  onDownload,
  canDownload,
  transcription = "",
  status = "idle",
  volume = 0,
  fps = 60,
}) {
  const [mic, setMic] = useState(60);

  const isRecording = status === "recording";
  const isPaused = status === "paused";

  const copyText = () => {
    if (!transcription) return;
    navigator.clipboard.writeText(transcription);
  };

  return (
    <div className="control-card">
      {/* ================= STATUS ================= */}
      <div className={`status-pill ${status}`}>
        {status === "recording" && "🔴 RECORDING"}
        {status === "paused" && "⏸ PAUSED"}
        {status === "stopped" && "⏹ STOPPED"}
        {status === "idle" && "⚪ IDLE"}
      </div>

      {/* ================= TRANSCRIPTION ================= */}
      <div className={`transcription ${isRecording ? "active" : ""}`}>
        {transcription && (
          <button className="copy-btn" onClick={copyText} title="Copy">
            📋
          </button>
        )}

        {isRecording
          ? transcription || "Listening..."
          : "Press Start to begin recording"}
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="button-row">
        <button className="btn start" onClick={onStart} disabled={isRecording}>
          Start
        </button>
        <button
          className="btn stop"
          onClick={onStop}
          disabled={status === "idle"}
        >
          Stop
        </button>
      </div>

      <div className="button-row">
        <button className="btn dark" onClick={onPause} disabled={!isRecording}>
          Pause
        </button>
        <button className="btn dark" onClick={onResume} disabled={!isPaused}>
          Resume
        </button>
      </div>

      {/* ================= AUDIO DOWNLOAD ================= */}
      <div className="button-row">
        <button
          className="btn dark"
          disabled={!canDownload}
          onClick={onDownload}
        >
          ⬇ Download Audio
        </button>
      </div>

      {/* ================= MIC ================= */}
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

      {/* ================= INDICATORS ================= */}
      <div className="indicator-card">
        <div style={{ width: "45%" }}>
          <span>FPS</span>
          <strong style={{ float: "right" }}>{fps}</strong>
          <div
            className="progress pink"
            style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
          />
        </div>

        <div style={{ width: "45%" }}>
          <span>Volume</span>
          <strong style={{ float: "right" }}>{Math.round(volume * 100)}</strong>
          <div
            className="progress pink"
            style={{ width: `${Math.min(volume * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
