// src/main/java/com/btec/quanlykhohang_api/controllers/NewsController.java
package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.News;
import com.btec.quanlykhohang_api.services.NewsService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Upload an image file and return its URL.
     *
     * @param file The image file to upload.
     * @return ResponseEntity with the URL of the uploaded image.
     */
    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
            }

            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + fileName;
            return new ResponseEntity<>(fileUrl, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new news article.
     *
     * @param title The title of the news.
     * @param image The image file (optional).
     * @param imageUrl The image URL (optional, used if no file is uploaded).
     * @param content The content of the news (JSON string).
     * @return ResponseEntity with the created news or error message.
     */
    @PostMapping
    public ResponseEntity<?> createNews(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "content", required = false) String content
    ) {
        try {
            // Kiểm tra các trường bắt buộc
            if (title == null || title.trim().isEmpty()) {
                return new ResponseEntity<>("Title is required", HttpStatus.BAD_REQUEST);
            }
            if (content == null || content.trim().isEmpty()) {
                return new ResponseEntity<>("Content is required", HttpStatus.BAD_REQUEST);
            }

            News news = new News();
            news.setTitle(title);

            // Chuyển đổi content từ JSON string sang List<Object>
            List<Object> contentList = objectMapper.readValue(content, new TypeReference<List<Object>>() {});
            news.setContent(contentList);

            // Xử lý hình ảnh
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.write(filePath, image.getBytes());
                String fileUrl = "http://localhost:8080/uploads/" + fileName;
                news.setImage(fileUrl);
            } else if (imageUrl != null && !imageUrl.isEmpty()) {
                news.setImage(imageUrl);
            }

            News savedNews = newsService.createNews(news);
            return new ResponseEntity<>(savedNews, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create news: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update a news article by ID.
     *
     * @param id The ID of the news to update.
     * @param title The updated title.
     * @param image The updated image file (optional).
     * @param imageUrl The updated image URL (optional, used if no file is uploaded).
     * @param content The updated content (JSON string).
     * @return ResponseEntity with the updated news or error message.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNews(
            @PathVariable String id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "content", required = false) String content
    ) {
        try {
            // Kiểm tra các trường bắt buộc
            if (title == null || title.trim().isEmpty()) {
                return new ResponseEntity<>("Title is required", HttpStatus.BAD_REQUEST);
            }
            if (content == null || content.trim().isEmpty()) {
                return new ResponseEntity<>("Content is required", HttpStatus.BAD_REQUEST);
            }

            News updatedNews = new News();
            updatedNews.setTitle(title);

            // Chuyển đổi content từ JSON string sang List<Object>
            List<Object> contentList = objectMapper.readValue(content, new TypeReference<List<Object>>() {});
            updatedNews.setContent(contentList);

            // Xử lý hình ảnh
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.write(filePath, image.getBytes());
                String fileUrl = "http://localhost:8080/uploads/" + fileName;
                updatedNews.setImage(fileUrl);
            } else if (imageUrl != null && !imageUrl.isEmpty()) {
                updatedNews.setImage(imageUrl);
            }

            News news = newsService.updateNews(id, updatedNews);
            return new ResponseEntity<>(news, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update news: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all news articles.
     *
     * @return ResponseEntity with the list of all news.
     */
    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        List<News> news = newsService.getAllNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    /**
     * Get a news article by ID.
     *
     * @param id The ID of the news to retrieve.
     * @return ResponseEntity with the news or error message.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable String id) {
        try {
            News news = newsService.getNewsById(id);
            return new ResponseEntity<>(news, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve news: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a news article by ID.
     *
     * @param id The ID of the news to delete.
     * @return ResponseEntity with success or error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable String id) {
        try {
            newsService.deleteNews(id);
            return new ResponseEntity<>("News deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete news: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Search news articles by title.
     *
     * @param search The search term to filter news by title.
     * @return ResponseEntity with the list of matching news.
     */
    @GetMapping("/search")
    public ResponseEntity<List<News>> searchNews(@RequestParam String search) {
        List<News> news = newsService.searchNews(search);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }
}