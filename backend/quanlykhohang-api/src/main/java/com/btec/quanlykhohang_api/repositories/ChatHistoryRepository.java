package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.ChatHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List; // Thêm dòng này

public interface ChatHistoryRepository extends MongoRepository<ChatHistory, String> {
    List<ChatHistory> findByUserId(String userId); // Sử dụng List hợp lệ
}