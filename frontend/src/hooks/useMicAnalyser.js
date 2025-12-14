import { useEffect, useRef, useState } from "react";

export default function useMicAnalyser(active) {
  const [volume, setVolume] = useState(0);
  const analyserRef = useRef();

  useEffect(() => {
    if (!active) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setVolume(avg / 255);
        requestAnimationFrame(loop);
      };
      loop();
    });
  }, [active]);

  return volume;
}
