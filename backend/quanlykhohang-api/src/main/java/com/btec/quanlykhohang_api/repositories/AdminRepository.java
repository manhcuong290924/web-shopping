// src/main/java/com/btec/quanlykhohang_api/repositories/AdminRepository.java
package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);
}