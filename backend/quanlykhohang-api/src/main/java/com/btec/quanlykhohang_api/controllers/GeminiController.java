package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.dto.ChatRequestDTO;
import com.btec.quanlykhohang_api.dto.ChatResponseDTO;
import com.btec.quanlykhohang_api.services.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {

    private final GeminiService geminiService;

    @Autowired
    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ChatResponseDTO> generateResponse(@RequestBody ChatRequestDTO request) {
        try {
            String response = geminiService.generateResponse(request.getUserId(), request.getPrompt());
            return ResponseEntity.ok(new ChatResponseDTO(response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ChatResponseDTO("Lỗi khi tạo phản hồi: " + e.getMessage()));
        }
    }
}