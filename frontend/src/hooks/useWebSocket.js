import { useEffect, useState } from "react";

export default function useWebSocket(active) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;

    const ws = new WebSocket("ws://localhost:8080/ws/transcribe");

    ws.onmessage = (e) => {
      setText((prev) => prev + " " + e.data);
    };

    return () => ws.close();
  }, [active]);

  return text;
}
