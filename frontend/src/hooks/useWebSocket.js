import { useEffect, useState } from "react";

export default function useWebSocket() {
  const [text, setText] = useState("");

  useEffect(() => {
    const words = ["Hello", "this", "is", "live", "audio", "transcription"];
    let i = 0;

    const interval = setInterval(() => {
      setText((t) => t + " " + words[i++ % words.length]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return text;
}
