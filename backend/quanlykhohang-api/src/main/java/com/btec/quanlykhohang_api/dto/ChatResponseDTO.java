package com.btec.quanlykhohang_api.dto;

public class ChatResponseDTO {
    private String response;

    // Constructors
    public ChatResponseDTO() {}

    public ChatResponseDTO(String response) {
        this.response = response;
    }

    // Getters and Setters
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
}