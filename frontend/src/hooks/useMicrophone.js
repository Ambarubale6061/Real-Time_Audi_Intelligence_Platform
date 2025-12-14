import { useEffect, useRef, useState } from "react";

export default function useMicrophone() {
  const analyserRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let ctx, analyser, source;

    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx = new AudioContext();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 128;

      source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      analyserRef.current = analyser;
      setActive(true);
    }

    init();

    return () => ctx && ctx.close();
  }, []);

  return { analyser: analyserRef.current, active };
}
