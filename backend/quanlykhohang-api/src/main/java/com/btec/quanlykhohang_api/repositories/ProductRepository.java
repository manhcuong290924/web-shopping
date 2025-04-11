package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    // Query Method: Tìm kiếm sản phẩm theo tên, không phân biệt hoa thường
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategory(String category);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findByQuantityGreaterThanEqual(int minQuantity, Pageable pageable);
}