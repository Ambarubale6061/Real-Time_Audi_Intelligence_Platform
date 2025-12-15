import { useState } from "react";
import AudioCircle3D from "./components/AudioCircle";
import ControlPanel from "./components/ControlPanel";

import useRecorder from "./hooks/useRecorder";
import useSpeechToText from "./hooks/useSpeechToText";
import useFPS from "./hooks/useFPS";

export default function App() {
  const recorder = useRecorder();
  const fps = useFPS();

  const [status, setStatus] = useState("idle");
  const [theme, setTheme] = useState("dark");

  const transcription = useSpeechToText(status === "recording");

  return (
    <div className={`app ${theme}`}>
      <h1 className="title">Audio Intelligence Dashboard</h1>

      <div className="dashboard">
        <div className="visual-box">
          <AudioCircle3D recording={status === "recording"} />
        </div>

        <ControlPanel
          status={status}
          transcription={transcription}
          volume={recorder.volume}
          fps={fps}
          theme={theme}
          onTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          onStart={() => {
            recorder.start();
            setStatus("recording");
          }}
          onPause={() => {
            recorder.pause();
            setStatus("paused");
          }}
          onResume={() => {
            recorder.resume();
            setStatus("recording");
          }}
          onStop={() => {
            recorder.stop();
            setStatus("stopped");
          }}
          onDownload={recorder.download}
          canDownload={recorder.canDownload}
        />
      </div>
    </div>
  );
}
