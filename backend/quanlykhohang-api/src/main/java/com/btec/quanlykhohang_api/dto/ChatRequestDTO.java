package com.btec.quanlykhohang_api.dto;

public class ChatRequestDTO {
    private String userId;
    private String prompt;

    // Constructors, getters, setters
    public ChatRequestDTO() {}

    public ChatRequestDTO(String userId, String prompt) {
        this.userId = userId;
        this.prompt = prompt;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
}