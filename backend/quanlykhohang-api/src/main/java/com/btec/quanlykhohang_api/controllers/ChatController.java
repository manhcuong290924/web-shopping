package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.dto.PromtRequest;
import com.btec.quanlykhohang_api.entities.Chat;
import com.btec.quanlykhohang_api.services.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ChatController {
    private final ChatService chatService;
//    @GetMapping("/{chat}")
//    public ResponseEntity<Chat> promptWithPathVariable(@PathVariable String chat) {
//        return ResponseEntity.ok(chatService.addChat(chat));
//    }
    @GetMapping("chats")
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }
    @PostMapping("/chat")
    public ResponseEntity<Chat> createChat(@RequestBody String promt) {
        return ResponseEntity.ok(chatService.addChat(promt));
    }
}
