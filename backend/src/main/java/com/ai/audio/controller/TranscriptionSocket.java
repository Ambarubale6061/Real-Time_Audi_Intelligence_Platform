package com.ai.audio.controller;

import com.ai.audio.service.GeminiStreamingService;
import com.ai.audio.service.SessionRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;

@Component
public class TranscriptionSocket implements WebSocketHandler {

  private final SessionRegistry sessionRegistry;
  private final GeminiStreamingService streamingService;

  public TranscriptionSocket(SessionRegistry sessionRegistry, GeminiStreamingService streamingService) {
    this.sessionRegistry = sessionRegistry;
    this.streamingService = streamingService;
  }

  @Override
  public Mono<Void> handle(WebSocketSession session) {
    reactor.core.publisher.Sinks.Many<String> audioSink = reactor.core.publisher.Sinks.many().multicast().onBackpressureBuffer();
    sessionRegistry.register(session.getId(), audioSink);

    return session.receive()
        .map(webSocketMessage -> webSocketMessage.getPayloadAsText().getBytes())
        .as(streamingService::streamAudio)
        .flatMap(transcribedText -> session.send(Mono.just(session.textMessage(transcribedText))))
        .doFinally(signal -> sessionRegistry.remove(session.getId()))
        .then();
  }
}
