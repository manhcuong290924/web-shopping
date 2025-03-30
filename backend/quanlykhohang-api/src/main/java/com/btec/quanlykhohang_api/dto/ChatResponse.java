package com.btec.quanlykhohang_api.dto;

import com.btec.quanlykhohang_api.entities.Chat;

import java.util.List;

public record ChatResponse(List<Choice> choices) {
    public static record Choice(ChatRequest.Message message) {

    }
}
