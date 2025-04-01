// src/main/java/com/btec/quanlykhohang_api/repositories/ProductRepository.java
package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    // Tìm kiếm sản phẩm theo tên, không phân biệt hoa thường
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategory(String category);

    Page<Product> findAll(Pageable pageable);
}