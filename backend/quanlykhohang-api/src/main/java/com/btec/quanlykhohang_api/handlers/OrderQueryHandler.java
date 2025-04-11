package com.btec.quanlykhohang_api.handlers;

import com.btec.quanlykhohang_api.services.ChatbotDataService;
import org.springframework.stereotype.Component;

@Component
public class OrderQueryHandler implements QueryHandler {

    @Override
    public boolean canHandle(String userInput) {
        return userInput.contains("order") || userInput.contains("đơn hàng");
    }

    @Override
    public String handle(ChatbotDataService service, String userInput) {
        if (userInput.contains("revenue") || userInput.contains("doanh thu")) {
            return service.getTotalRevenueAsString();
        }
        return service.getAllOrdersAsString();
    }
}