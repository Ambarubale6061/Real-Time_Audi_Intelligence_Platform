import { useRef, useState } from "react";

export default function useRecorder() {
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const analyserRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [volume, setVolume] = useState(0);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;

    const recorder = new MediaRecorder(stream);
    mediaRecorder.current = recorder;

    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = () => setCanDownload(true);

    recorder.start();
    setIsRecording(true);

    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      setVolume(data[0] / 255);
      if (isRecording) requestAnimationFrame(tick);
    };
    tick();
  }

  function stop() {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  }

  function pause() {
    mediaRecorder.current?.pause();
  }

  function resume() {
    mediaRecorder.current?.resume();
  }

  function download() {
    const blob = new Blob(chunks.current, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.wav";
    a.click();
  }

  return {
    start,
    stop,
    pause,
    resume,
    download,
    analyser: analyserRef.current,
    isRecording,
    canDownload,
    volume,
  };
}
