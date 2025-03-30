package com.btec.quanlykhohang_api.dto;

import java.util.List;

public record ChatRequest(List<Message> messages) {
    public static record Message(String message){

    }
}
