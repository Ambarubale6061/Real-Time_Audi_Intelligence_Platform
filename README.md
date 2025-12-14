# Real-Time_Audi_Intelligence_Platform

## Contents

- frontend: Vite + React app (captures microphone, shows circular visualizer, streams audio to backend)
- backend: Spring Boot WebFlux mock server (accepts audio frames over WebSocket and returns mock partial transcripts)

## Quick start (development)

1. Frontend:

   - cd frontend
   - npm install
   - npm run dev
   - open http://localhost:3000

2. Backend:
   - cd backend
   - mvn package
   - java -jar target/audio-intel-backend-0.0.1-SNAPSHOT.jar
   - or run in your IDE

## Notes

- Backend currently mocks Gemini streaming. Replace the logic in StreamController (or add a GeminiGatewayService) to forward audio to Gemini's streaming API.
- For production, add TLS, authentication, and proper backpressure handling as described in the project document.
