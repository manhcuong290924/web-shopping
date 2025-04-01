// src/main/java/com/btec/quanlykhohang_api/entities/Product.java
package com.btec.quanlykhohang_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;
    private String category;
    private String subCategory;
    private String imageUrl;
    private double originalPrice;
    private double discountedPrice;
    private double discountPercentage;
    private LocalDateTime createdDate;
    private String desc;

    // Danh sách category cố định
    private static final List<String> VALID_CATEGORIES = Arrays.asList(
            "Điện tử",
            "Sản phẩm nổi bật",
            "Thời Trang",
            "Mẹ và Bé",
            "Gia dụng và Nội thất",
            "Văn phòng phẩm",
            "Giày dép",
            "Mỹ Phẩm"
    );

    // Danh sách subCategory tương ứng với từng category
    private static final Map<String, List<String>> SUB_CATEGORY_MAP = new HashMap<>();

    static {
        SUB_CATEGORY_MAP.put("Điện tử", Arrays.asList("Điện thoại", "Laptop", "Máy tính bảng"));
        SUB_CATEGORY_MAP.put("Thời Trang", Arrays.asList("Quần áo nữ", "Quần áo nam"));
        SUB_CATEGORY_MAP.put("Gia dụng và Nội thất", Arrays.asList("Đồ gia dụng", "Nội thất"));
        SUB_CATEGORY_MAP.put("Sản phẩm nổi bật", Arrays.asList());
        SUB_CATEGORY_MAP.put("Mẹ và Bé", Arrays.asList());
        SUB_CATEGORY_MAP.put("Văn phòng phẩm", Arrays.asList());
        SUB_CATEGORY_MAP.put("Giày dép", Arrays.asList());
        SUB_CATEGORY_MAP.put("Mỹ Phẩm", Arrays.asList());
    }

    // Getters và Setters
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
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }
        if (!VALID_CATEGORIES.contains(category)) {
            throw new IllegalArgumentException("Invalid category. Must be one of: " + VALID_CATEGORIES);
        }
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        if (subCategory != null && category != null) {
            List<String> validSubCategories = SUB_CATEGORY_MAP.getOrDefault(category, Arrays.asList());
            if (!validSubCategories.isEmpty() && !validSubCategories.contains(subCategory)) {
                throw new IllegalArgumentException("Invalid subCategory for category " + category + ". Must be one of: " + validSubCategories);
            }
        }
        this.subCategory = subCategory;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(double originalPrice) {
        if (originalPrice < 0) {
            throw new IllegalArgumentException("Original price must be non-negative");
        }
        this.originalPrice = originalPrice;
    }

    public double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(double discountedPrice) {
        if (discountedPrice < 0) {
            throw new IllegalArgumentException("Discounted price must be non-negative");
        }
        this.discountedPrice = discountedPrice;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        if (discountPercentage < 0) {
            throw new IllegalArgumentException("Discount percentage must be non-negative");
        }
        this.discountPercentage = discountPercentage;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        if (desc == null || desc.trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }
        this.desc = desc;
    }
}