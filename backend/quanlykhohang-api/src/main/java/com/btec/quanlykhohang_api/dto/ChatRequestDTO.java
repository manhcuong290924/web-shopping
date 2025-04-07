package com.btec.quanlykhohang_api.dto;

public class ChatRequestDTO {
    private String prompt;

    // Constructors
    public ChatRequestDTO() {}

    public ChatRequestDTO(String prompt) {
        this.prompt = prompt;
    }

    // Getters and Setters
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
}