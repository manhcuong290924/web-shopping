package com.btec.quanlykhohang_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat_history")
public class ChatHistory {
    @Id
    private String id;
    private String userId;
    private String prompt;
    private String response;
    private String timestamp;

    // Constructors
    public ChatHistory() {}

    public ChatHistory(String userId, String prompt, String response, String timestamp) {
        this.userId = userId;
        this.prompt = prompt;
        this.response = response;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}