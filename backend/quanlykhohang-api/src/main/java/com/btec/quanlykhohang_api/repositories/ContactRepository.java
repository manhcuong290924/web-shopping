// src/main/java/com/btec/quanlykhohang_api/repositories/ContactRepository.java
package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    // Tìm kiếm liên hệ theo name hoặc email (không phân biệt hoa thường)
    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'email': { $regex: ?0, $options: 'i' } } ] }")
    List<Contact> findByNameOrEmail(String searchTerm);
}

