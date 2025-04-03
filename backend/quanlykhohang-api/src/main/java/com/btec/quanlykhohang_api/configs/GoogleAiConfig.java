package com.btec.quanlykhohang_api.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleAiConfig {

    @Value("${google.ai.api.key}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}