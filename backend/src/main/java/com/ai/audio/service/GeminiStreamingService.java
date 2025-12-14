package com.ai.audio.service;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;

@Service
public class GeminiStreamingService {

  // Example method for streaming audio to Gemini API
  public Flux<String> streamAudio(Flux<byte[]> audioFlux) {
    return audioFlux.flatMap(chunk -> sendChunk(chunk))
        .retryWhen(Retry.fixedDelay(3, Duration.ofSeconds(1)));
  }

  private Mono<String> sendChunk(byte[] chunk) {
    // Call Gemini API streaming logic here
    // Replace with actual API call
    return Mono.just("transcribed chunk");
  }
}
