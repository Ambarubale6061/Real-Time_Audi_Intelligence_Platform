export default function TranscriptionPanel({ text }) {
  return (
    <div className={`transcription ${text ? "active" : ""}`}>
      {text || "Waiting for transcription..."}
    </div>
  );
}
