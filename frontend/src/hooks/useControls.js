import { useState } from "react";

export function useControls() {
  const [muted, setMuted] = useState(false);
  const [gain, setGain] = useState(1);
  const [theme, setTheme] = useState("dark");

  return {
    muted,
    gain,
    theme,
    toggleMute: () => setMuted(!muted),
    setGain,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "neon" : "dark")),
  };
}
