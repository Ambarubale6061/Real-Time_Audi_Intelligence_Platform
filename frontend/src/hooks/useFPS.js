import { useEffect, useRef, useState } from "react";

export default function useFPS() {
  const [fps, setFPS] = useState(60);
  const last = useRef(performance.now());
  const frames = useRef(0);

  useEffect(() => {
    const loop = () => {
      frames.current++;
      const now = performance.now();

      if (now - last.current >= 1000) {
        setFPS(frames.current);
        frames.current = 0;
        last.current = now;
      }
      requestAnimationFrame(loop);
    };
    loop();
  }, []);

  return fps;
}
