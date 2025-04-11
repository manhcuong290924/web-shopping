package com.btec.quanlykhohang_api.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class GeminiService {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    @Value("${gemini.api.key}")
    private String API_KEY;

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String callGemini(String prompt) throws IOException {
        // Tạo JSON payload bằng Jackson để tự động escape ký tự đặc biệt
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode contentsArray = objectMapper.createArrayNode();
        ObjectNode contentNode = objectMapper.createObjectNode();
        ArrayNode partsArray = objectMapper.createArrayNode();
        ObjectNode partNode = objectMapper.createObjectNode();

        partNode.put("text", prompt);
        partsArray.add(partNode);
        contentNode.set("parts", partsArray);
        contentsArray.add(contentNode);
        rootNode.set("contents", contentsArray);

        ObjectNode generationConfig = objectMapper.createObjectNode();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("topK", 40);
        generationConfig.put("topP", 0.95);
        generationConfig.put("maxOutputTokens", 1024);
        rootNode.set("generationConfig", generationConfig);

        String jsonBody = objectMapper.writeValueAsString(rootNode);

        RequestBody body = RequestBody.create(
                jsonBody,
                MediaType.get("application/json; charset=utf-8")
        );

        Request request = new Request.Builder()
                .url(GEMINI_API_URL + "?key=" + API_KEY)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "No error details available";
                throw new IOException("Unexpected code " + response + ", details: " + errorBody);
            }
            String responseBody = response.body().string();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            // Kiểm tra xem candidates có tồn tại và không rỗng không
            JsonNode candidates = jsonNode.path("candidates");
            if (candidates.isMissingNode() || candidates.size() == 0) {
                throw new IOException("No candidates found in Gemini API response: " + responseBody);
            }

            // Kiểm tra content và parts
            JsonNode content = candidates.get(0).path("content");
            if (content.isMissingNode()) {
                throw new IOException("No content found in Gemini API response: " + responseBody);
            }

            JsonNode parts = content.path("parts");
            if (parts.isMissingNode() || parts.size() == 0) {
                throw new IOException("No parts found in Gemini API response: " + responseBody);
            }

            JsonNode text = parts.get(0).path("text");
            if (text.isMissingNode()) {
                throw new IOException("No text found in Gemini API response: " + responseBody);
            }

            return text.asText();
        }
    }
}