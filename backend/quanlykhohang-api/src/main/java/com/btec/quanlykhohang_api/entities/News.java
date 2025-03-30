// src/main/java/com/btec/quanlykhohang_api/entities/News.java
package com.btec.quanlykhohang_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "news")
public class News {

    @Id
    private String id;
    private String title;
    private String image;
    private List<Object> content; // Content có thể chứa cả đoạn văn (String) và danh sách (List<String>)
    private LocalDateTime createdAt;

    // Constructors
    public News() {
        this.createdAt = LocalDateTime.now();
    }

    public News(String title, String image, List<Object> content) {
        this.title = title;
        this.image = image;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Object> getContent() {
        return content;
    }

    public void setContent(List<Object> content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}