package com.ai.audio.config;

import com.ai.audio.controller.TranscriptionSocket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

import java.util.Map;

@Configuration
public class WebSocketRouter {

  private final TranscriptionSocket transcriptionSocket;

  public WebSocketRouter(TranscriptionSocket transcriptionSocket) {
    this.transcriptionSocket = transcriptionSocket;
  }

  @Bean
  public HandlerMapping webSocketMapping() {
    return new SimpleUrlHandlerMapping() {
      {
        setOrder(10);
        setUrlMap(Map.of("/ws/transcription", (WebSocketHandler) transcriptionSocket));
      }
    };
  }
}
