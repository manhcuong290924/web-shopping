package com.btec.quanlykhohang_api.handlers;

import com.btec.quanlykhohang_api.services.ChatbotDataService;
import org.springframework.stereotype.Component;

@Component
public class UserQueryHandler implements QueryHandler {

    @Override
    public boolean canHandle(String userInput) {
        return userInput.contains("user") || userInput.contains("người dùng");
    }

    @Override
    public String handle(ChatbotDataService service, String userInput) {
        if (userInput.contains("total") || userInput.contains("tổng số")) {
            return service.getTotalUsersAsString();
        }
        return service.getAllUsersAsString();
    }
}