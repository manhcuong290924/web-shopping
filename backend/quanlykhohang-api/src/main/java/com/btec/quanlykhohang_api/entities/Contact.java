// src/main/java/com/btec/quanlykhohang_api/entities/Contact.java
package com.btec.quanlykhohang_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "contacts")
public class Contact {

    @Id
    private String id;
    private String name;
    private String email;
    private String title;
    private String message;
    private LocalDateTime createdAt;

    // Constructors
    public Contact() {
        this.createdAt = LocalDateTime.now();
    }

    public Contact(String name, String email, String title, String message) {
        this.name = name;
        this.email = email;
        this.title = title;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}