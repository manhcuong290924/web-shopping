// src/main/java/com/btec/quanlykhohang_api/services/NewsService.java
package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.News;
import com.btec.quanlykhohang_api.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    // Tạo tin tức mới
    public News createNews(News news) {
        // Kiểm tra các trường bắt buộc
        if (news.getTitle() == null || news.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required.");
        }
        return newsRepository.save(news);
    }

    // Lấy danh sách tất cả tin tức
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    // Lấy tin tức theo ID
    public News getNewsById(String id) {
        Optional<News> newsOptional = newsRepository.findById(id);
        if (!newsOptional.isPresent()) {
            throw new IllegalArgumentException("News not found with id: " + id);
        }
        return newsOptional.get();
    }

    // Cập nhật tin tức
    public News updateNews(String id, News updatedNews) {
        Optional<News> newsOptional = newsRepository.findById(id);
        if (!newsOptional.isPresent()) {
            throw new IllegalArgumentException("News not found with id: " + id);
        }

        News news = newsOptional.get();
        // Cập nhật các trường
        if (updatedNews.getTitle() != null && !updatedNews.getTitle().trim().isEmpty()) {
            news.setTitle(updatedNews.getTitle());
        }
        if (updatedNews.getImage() != null) {
            news.setImage(updatedNews.getImage());
        }
        if (updatedNews.getContent() != null && !updatedNews.getContent().isEmpty()) {
            news.setContent(updatedNews.getContent());
        }

        return newsRepository.save(news);
    }

    // Xóa tin tức
    public void deleteNews(String id) {
        if (!newsRepository.existsById(id)) {
            throw new IllegalArgumentException("News not found with id: " + id);
        }
        newsRepository.deleteById(id);
    }

    // Tìm kiếm tin tức theo tiêu đề
    public List<News> searchNews(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllNews();
        }
        return newsRepository.findByTitleContainingIgnoreCase(searchTerm);
    }
}