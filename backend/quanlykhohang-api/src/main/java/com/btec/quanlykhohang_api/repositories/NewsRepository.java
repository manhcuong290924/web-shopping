// src/main/java/com/btec/quanlykhohang_api/repositories/NewsRepository.java
package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {

    // Tìm kiếm tin tức theo tiêu đề (không phân biệt hoa thường)
    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    List<News> findByTitleContainingIgnoreCase(String title);
}