import { useEffect, useRef, useState } from "react";

export default function useRecorder() {
  const recorder = useRef(null);
  const analyser = useRef(null);
  const data = useRef(null);
  const chunks = useRef([]);

  const [volume, setVolume] = useState(0);
  const [canDownload, setCanDownload] = useState(false);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const ctx = new AudioContext();
    analyser.current = ctx.createAnalyser();
    analyser.current.fftSize = 256;

    const src = ctx.createMediaStreamSource(stream);
    src.connect(analyser.current);

    data.current = new Uint8Array(analyser.current.frequencyBinCount);

    recorder.current = new MediaRecorder(stream);
    chunks.current = [];

    recorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.current.onstop = () => setCanDownload(true);

    recorder.current.start();

    const loop = () => {
      analyser.current.getByteFrequencyData(data.current);
      const avg = data.current.reduce((a, b) => a + b, 0) / data.current.length;
      setVolume(avg / 255);
      requestAnimationFrame(loop);
    };
    loop();
  }

  function pause() {
    recorder.current?.pause();
  }

  function resume() {
    recorder.current?.resume();
  }

  function stop() {
    recorder.current?.stop();
  }

  function download() {
    const blob = new Blob(chunks.current, { type: "audio/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "recording.webm";
    a.click();
  }

  return { start, pause, resume, stop, download, volume, canDownload };
}
