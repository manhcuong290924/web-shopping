package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.configs.OpenAiConfig;
import com.btec.quanlykhohang_api.entities.ChatHistory;
import com.btec.quanlykhohang_api.repositories.ChatHistoryRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class OpenAiService {

    private static final Logger logger = LoggerFactory.getLogger(OpenAiService.class);
    private final ChatHistoryRepository chatHistoryRepository;
    private final String apiKey;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    @Autowired
    public OpenAiService(ChatHistoryRepository chatHistoryRepository, OpenAiConfig openAiConfig) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.apiKey = openAiConfig.getApiKey();
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String generateResponse(String userId, String prompt) throws Exception {
        logger.info("Generating response for userId={}, prompt={}", userId, prompt);

        // Tạo request body cho OpenAI API
        String requestBody = String.format(
                "{\"model\": \"gpt-4o-mini\", \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}], \"max_tokens\": 500}",
                prompt
        );
        logger.debug("Request body: {}", requestBody);

        // Tạo headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // Gửi request tới OpenAI API
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        String response = restTemplate.postForObject(OPENAI_API_URL, request, String.class);

        // Log response thô
        logger.info("Raw OpenAI response: {}", response);

        // Parse phản hồi từ OpenAI
        String aiResponse = extractTextFromResponse(response);

        // Log phản hồi đã parse
        logger.info("Parsed response: {}", aiResponse);

        // Lưu lịch sử chat
        ChatHistory chatHistory = new ChatHistory(userId, prompt, aiResponse, LocalDateTime.now().toString());
        chatHistoryRepository.save(chatHistory);

        return aiResponse;
    }

    private String extractTextFromResponse(String response) throws Exception {
        JsonNode rootNode = objectMapper.readTree(response);
        JsonNode choices = rootNode.path("choices");
        if (choices.isArray() && choices.size() > 0) {
            String content = choices.get(0).path("message").path("content").asText();
            if (content.isEmpty()) {
                logger.warn("Response content is empty");
            }
            return content;
        } else {
            logger.error("No choices found in response: {}", response);
            throw new Exception("No content found in OpenAI response");
        }
    }
}