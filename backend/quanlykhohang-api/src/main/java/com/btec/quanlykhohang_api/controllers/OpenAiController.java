package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.dto.ChatRequestDTO;
import com.btec.quanlykhohang_api.dto.ChatResponseDTO;
import com.btec.quanlykhohang_api.services.OpenAiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class OpenAiController {

    private static final Logger logger = LoggerFactory.getLogger(OpenAiController.class);
    private final OpenAiService openAiService;

    @Autowired
    public OpenAiController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ChatResponseDTO> generateResponse(@RequestBody ChatRequestDTO request) {
        try {
            logger.info("Received request: prompt={}", request.getPrompt());
            String response = openAiService.generateResponse(request.getPrompt());
            logger.info("Generated response: {}", response);
            return ResponseEntity.ok(new ChatResponseDTO(response));
        } catch (Exception e) {
            logger.error("Error generating response: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ChatResponseDTO("Lỗi khi tạo phản hồi: " + e.getMessage()));
        }
    }
}