package com.ai.audio.controller;

import com.ai.audio.service.GeminiStreamingService;
import com.ai.audio.service.SessionRegistry;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("/api/audio")
public class AudioStreamController {

  private final GeminiStreamingService geminiService;
  private final SessionRegistry sessionRegistry;

  public AudioStreamController(GeminiStreamingService geminiService,
      SessionRegistry sessionRegistry) {
    this.geminiService = geminiService;
    this.sessionRegistry = sessionRegistry;
  }

  @PostMapping(value = "/stream", consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public Flux<String> streamAudio(@RequestBody Flux<byte[]> audioStream) {
    return geminiService.streamAudio(audioStream);
  }
}
