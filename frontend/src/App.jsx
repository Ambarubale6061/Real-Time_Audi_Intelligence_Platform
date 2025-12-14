import AudioCircle3D from "./components/AudioCircle";
import ControlPanel from "./components/ControlPanel";
import TranscriptionPanel from "./components/TranscriptionPanel";
import Indicators from "./components/Indicators";

import useRecorder from "./hooks/useRecorder";
import useWebSocket from "./hooks/useWebSocket";

export default function App() {
  const recorder = useRecorder();
  const transcriptionText = useWebSocket();

  return (
    <div className="app">
      <h1 className="title">Audio Intelligence Dashboard</h1>

      <div className="dashboard">
        <div className="visual-box">
          <AudioCircle3D recording={recorder.isRecording} />
        </div>

        <div className="panel">
          <ControlPanel
            onStart={recorder.start}
            onStop={recorder.stop}
            onPause={recorder.pause}
            onResume={recorder.resume}
            onDownload={recorder.download}
            canDownload={recorder.canDownload}
          />

          <TranscriptionPanel text={transcriptionText} />

          <Indicators fps={60} volume={recorder.volume} />
        </div>
      </div>
    </div>
  );
}
