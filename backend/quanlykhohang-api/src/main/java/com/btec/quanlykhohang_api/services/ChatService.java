package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.dto.ChatRequest;
import com.btec.quanlykhohang_api.dto.ChatResponse;
import com.btec.quanlykhohang_api.dto.PromtRequest;
import com.btec.quanlykhohang_api.entities.Chat;
import com.btec.quanlykhohang_api.repositories.ChatRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;


import java.util.List;

@Service
public class ChatService {
    private final ChatClient chatClient;
//    private final RestClient restClient;
    @Autowired
    private ChatRepository chatRepository;

    public ChatService(ChatClient.Builder chatClient/*RestClient.Builder restClient)*/) {
        this.chatClient = chatClient.build();
//        this.restClient = restClient.build();
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }
    public Chat addChat(String question) {
        Chat chat = new Chat();
        String response = chatClient
                .prompt(question)
                .call()
                .content();
        chat.setQuestion(question);
        chat.setAnswer(response);
        return chatRepository.save(chat);
    }
//    public String getChatResponse(PromtRequest promtRequest) {
//        ChatRequest chatRequest = new ChatRequest(
//                List.of(new ChatRequest.Message(promtRequest.promt()))
//        );
//        ChatResponse chatResponse = restClient.post()
//                .header("Authorization","Bearer")
//                .header("Content-Type", "application/json")
//                .body(chatRequest)
//                .retrieve()
//                .body(ChatResponse.class);
//        return chatResponse.choices().get(0).message().message();
//    }


}
