// src/main/java/com/btec/quanlykhohang_api/repositories/OrderRepository.java
package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, String> {
    @Query("{$or: [{email: {$regex: ?0, $options: 'i'}}, {phone: {$regex: ?0, $options: 'i'}}]}")
    Page<Order> findByEmailOrPhone(String search, Pageable pageable);
}