package com.btec.quanlykhohang_api.handlers;

import com.btec.quanlykhohang_api.services.ChatbotDataService;

public interface QueryHandler {
    boolean canHandle(String userInput);
    String handle(ChatbotDataService service, String userInput);
}