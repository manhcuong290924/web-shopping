package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.configs.OpenAiConfig;
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

@Service
public class OpenAiService {

    private static final Logger logger = LoggerFactory.getLogger(OpenAiService.class);
    private final String apiKey;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String FIRST_MESSAGE_RESPONSE = "Chào bạn! Chào mừng bạn đến với hệ thống hỗ trợ mua sắm trực tuyến của chúng tôi. Chúng tôi là nhóm phát triển thuộc lớp SE06203, trường BTEC, sẵn sàng giúp bạn tìm kiếm và chọn lựa sản phẩm tuyệt vời nhất!";
    private static boolean isFirstMessage = true; // Biến tĩnh để kiểm tra lần đầu tiên

    @Autowired
    public OpenAiService(OpenAiConfig openAiConfig) {
        this.apiKey = openAiConfig.getApiKey();
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String generateResponse(String prompt) throws Exception {
        logger.info("Generating response for prompt={}", prompt);

        // Kiểm tra nếu là tin nhắn đầu tiên
        if (isFirstMessage) {
            logger.info("First message detected");
            isFirstMessage = false; // Đặt lại cờ sau lần đầu
            return FIRST_MESSAGE_RESPONSE;
        }

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