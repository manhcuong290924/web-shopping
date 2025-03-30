package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
