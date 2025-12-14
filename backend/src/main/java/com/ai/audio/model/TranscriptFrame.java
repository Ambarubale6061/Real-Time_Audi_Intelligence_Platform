package com.ai.audio.model;

public class TranscriptFrame {
    private final String text;
    private final boolean isFinal;
    private final String language;
    private final long timestamp;

    public TranscriptFrame(String text, boolean isFinal, String language, long timestamp) {
        this.text = text;
        this.isFinal = isFinal;
        this.language = language;
        this.timestamp = timestamp;
    }

    public String text() { return text; }
    public boolean isFinal() { return isFinal; }
    public String language() { return language; }
    public long timestamp() { return timestamp; }
}
