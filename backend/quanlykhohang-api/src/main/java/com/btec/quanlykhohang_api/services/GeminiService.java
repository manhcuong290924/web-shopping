package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.ChatHistory;
import com.btec.quanlykhohang_api.repositories.ChatHistoryRepository;
import com.btec.quanlykhohang_api.configs.GoogleAiConfig; // Thêm dòng này
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class GeminiService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final String apiKey;
    private final RestTemplate restTemplate;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=";

    @Autowired
    public GeminiService(ChatHistoryRepository chatHistoryRepository, GoogleAiConfig googleAiConfig) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.apiKey = googleAiConfig.getApiKey();
        this.restTemplate = new RestTemplate();
    }

    public String generateResponse(String userId, String prompt) throws Exception {
        // Tạo request body cho Gemini API
        String requestBody = String.format(
                "{\"contents\": [{\"parts\": [{\"text\": \"%s\"}]}]}",
                prompt
        );

        // Gọi API Gemini
        String url = GEMINI_API_URL + apiKey;
        String response = restTemplate.postForObject(url, requestBody, String.class);

        // Xử lý phản hồi (giả định response là JSON, bạn cần parse để lấy text)
        // Đây là ví dụ đơn giản, bạn có thể dùng thư viện như Jackson để parse JSON
        String aiResponse = extractTextFromResponse(response);

        // Lưu lịch sử
        ChatHistory chatHistory = new ChatHistory(userId, prompt, aiResponse, LocalDateTime.now().toString());
        chatHistoryRepository.save(chatHistory);

        return aiResponse;
    }

    // Phương thức giả định để parse JSON (cần điều chỉnh dựa trên cấu trúc thực tế của response)
    private String extractTextFromResponse(String response) {
        // Ví dụ: Giả sử response có dạng {"candidates": [{"content": {"parts": [{"text": "response text"}]}}]}
        // Bạn nên dùng thư viện như Jackson để parse JSON
        int startIndex = response.indexOf("\"text\": \"") + 9;
        int endIndex = response.indexOf("\"", startIndex);
        return response.substring(startIndex, endIndex);
    }
}