import { useEffect, useState } from "react";

export default function useWebSocket() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const socket = new WebSocket(
      "wss://real-time-audi-intelligence-platform-2.onrender.com/ws"
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
      setStatus("connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.transcript) {
          setText((prev) => prev + " " + data.transcript);
        }
      } catch {
        setText((prev) => prev + " " + event.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
      setStatus("error");
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      setStatus("closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return { text, status };
}
