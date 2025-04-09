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

    // Tìm kiếm sản phẩm có số lượng lớn hơn hoặc bằng giá trị cho trước
    Page<Product> findByQuantityGreaterThanEqual(int minQuantity, Pageable pageable);
}