package com.ai.audio.service;

import org.springframework.stereotype.Component;
import reactor.core.publisher.Sinks;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Component
public class SessionRegistry {

  private final Map<String, Sinks.Many<String>> sessions = new ConcurrentHashMap<>();

  public void register(String sessionId, Sinks.Many<String> sink) {
    sessions.put(sessionId, sink);
  }

  public Sinks.Many<String> get(String sessionId) {
    return sessions.get(sessionId);
  }

  public void remove(String sessionId) {
    sessions.remove(sessionId);
  }
}
