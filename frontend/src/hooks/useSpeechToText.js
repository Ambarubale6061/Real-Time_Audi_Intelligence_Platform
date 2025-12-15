import { useEffect, useRef, useState } from "react";

export default function useSpeechToText(active) {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.maxAlternatives = 5;

    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript + " ";
      }
      setText(finalText.trim());
    };

    recognition.onerror = () => recognition.stop();

    recognitionRef.current = recognition;

    if (active) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [active]);

  return text;
}
