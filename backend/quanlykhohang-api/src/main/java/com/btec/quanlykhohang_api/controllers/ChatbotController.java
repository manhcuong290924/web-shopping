package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.handlers.QueryHandler;
import com.btec.quanlykhohang_api.services.ChatbotDataService;
import com.btec.quanlykhohang_api.services.ChatGPTService; // Thay GeminiService bằng ChatGPTService
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private static final Logger logger = LoggerFactory.getLogger(ChatbotController.class);

    @Autowired
    private ChatGPTService chatGPTService; // Thay GeminiService bằng ChatGPTService

    @Autowired
    private ChatbotDataService chatbotDataService;

    @Autowired
    private List<QueryHandler> queryHandlers;

    @PostMapping("/query")
    public ResponseEntity<String> handleChatbotQuery(@RequestBody String userInput) {
        logger.info("Received query: {}", userInput);
        try {
            String userInputLower = userInput.toLowerCase();

            logger.info("Available handlers: {}", queryHandlers.stream()
                    .map(handler -> handler.getClass().getSimpleName())
                    .collect(Collectors.toList()));

            for (QueryHandler handler : queryHandlers) {
                if (handler.canHandle(userInputLower)) {
                    logger.info("Query will be handled by: {}", handler.getClass().getSimpleName());
                    String response = handler.handle(chatbotDataService, userInput);
                    logger.info("Query handled by {}: {}", handler.getClass().getSimpleName(), response);
                    return ResponseEntity.ok(response);
                } else {
                    logger.info("Handler {} cannot handle query", handler.getClass().getSimpleName());
                }
            }

            logger.info("No specific handler found, forwarding to ChatGPT API");
            String prompt = userInput + "\nPlease respond in Vietnamese.";
            String chatGPTResponse = chatGPTService.callChatGPT(prompt); // Thay callGemini bằng callChatGPT
            logger.info("ChatGPT API response: {}", chatGPTResponse);
            return ResponseEntity.ok(chatGPTResponse);

        } catch (Exception e) { // Xóa IOException vì callChatGPT không ném IOException
            logger.error("Unexpected error processing query: {}", userInput, e);
            return ResponseEntity.status(500).body("Lỗi hệ thống: Vui lòng thử lại sau");
        }
    }
}