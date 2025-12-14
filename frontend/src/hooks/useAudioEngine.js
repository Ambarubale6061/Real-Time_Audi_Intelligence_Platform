import { useRef, useState } from "react";

export default function useAudioEngine() {
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [isRunning, setIsRunning] = useState(false);
  const [volume, setVolume] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState(null);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioCtxRef.current = new AudioContext();
    const source = audioCtxRef.current.createMediaStreamSource(stream);

    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 512;

    source.connect(analyserRef.current);

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) =>
      chunksRef.current.push(e.data);

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      setRecordedUrl(URL.createObjectURL(blob));
      chunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRunning(true);
    animate();
  }

  function animate() {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);

    const loop = () => {
      analyserRef.current.getByteFrequencyData(data);
      setVolume(Math.round(data.reduce((a, b) => a + b, 0) / data.length));
      if (isRunning) requestAnimationFrame(loop);
    };
    loop();
  }

  function pause() {
    audioCtxRef.current?.suspend();
  }

  function resume() {
    audioCtxRef.current?.resume();
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    audioCtxRef.current?.close();
    setIsRunning(false);
  }

  return {
    analyser: analyserRef.current,
    volume,
    recordedUrl,
    isRunning,
    start,
    pause,
    resume,
    stop,
  };
}
