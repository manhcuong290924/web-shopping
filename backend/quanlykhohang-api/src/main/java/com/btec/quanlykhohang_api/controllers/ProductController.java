// src/main/java/com/btec/quanlykhohang_api/controllers/ProductController.java
package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.services.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Upload an image file and return its URL.
     *
     * @param file The image file to upload.
     * @return ResponseEntity with the URL of the uploaded image.
     */
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
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
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get all products with pagination.
     *
     * @param page The page number (default is 0).
     * @param size The number of items per page (default is 10).
     * @param request The HTTP request.
     * @return ResponseEntity with the list of products for the requested page.
     */
    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest request
    ) {
        Page<Product> products = productService.getAllProducts(page, size);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    /**
     * Get a product by ID.
     *
     * @param id The ID of the product to retrieve.
     * @param request The HTTP request.
     * @return ResponseEntity with the product or error message.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id, HttpServletRequest request) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Create a new product.
     *
     * @param name The name of the product.
     * @param image The image file (optional).
     * @param imageUrl The image URL (optional, used if no file is uploaded).
     * @param originalPrice The original price of the product.
     * @param discountedPrice The discounted price of the product.
     * @param discountPercentage The discount percentage of the product.
     * @param category The category of the product.
     * @param subCategory The subCategory of the product (optional).
     * @param desc The description of the product.
     * @param request The HTTP request.
     * @return The created product.
     */
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "originalPrice", required = false, defaultValue = "0") double originalPrice,
            @RequestParam(value = "discountedPrice", required = false, defaultValue = "0") double discountedPrice,
            @RequestParam(value = "discountPercentage", required = false, defaultValue = "0") double discountPercentage,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "subCategory", required = false) String subCategory,
            @RequestParam(value = "desc", required = false) String desc,
            HttpServletRequest request
    ) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setCategory(category);
            product.setSubCategory(subCategory);
            product.setOriginalPrice(originalPrice);
            product.setDiscountedPrice(discountedPrice);
            product.setDiscountPercentage(discountPercentage);
            product.setDesc(desc);

            // Xử lý hình ảnh
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                try {
                    Files.write(filePath, image.getBytes());
                } catch (IOException e) {
                    return new ResponseEntity<>("Failed to upload image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
                String fileUrl = "http://localhost:8080/uploads/" + fileName;
                product.setImageUrl(fileUrl);
            } else if (imageUrl != null && !imageUrl.isEmpty()) {
                product.setImageUrl(imageUrl);
            }

            Product createdProduct = productService.addProduct(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Update a product by ID.
     *
     * @param id The ID of the product to update.
     * @param name The updated name of the product.
     * @param image The updated image file (optional).
     * @param imageUrl The updated image URL (optional, used if no file is uploaded).
     * @param originalPrice The updated original price of the product.
     * @param discountedPrice The updated discounted price of the product.
     * @param discountPercentage The updated discount percentage of the product.
     * @param category The updated category of the product.
     * @param subCategory The updated subCategory of the product (optional).
     * @param desc The updated description of the product.
     * @param request The HTTP request.
     * @return The updated product.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "originalPrice", required = false, defaultValue = "0") double originalPrice,
            @RequestParam(value = "discountedPrice", required = false, defaultValue = "0") double discountedPrice,
            @RequestParam(value = "discountPercentage", required = false, defaultValue = "0") double discountPercentage,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "subCategory", required = false) String subCategory,
            @RequestParam(value = "desc", required = false) String desc,
            HttpServletRequest request
    ) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setCategory(category);
            product.setSubCategory(subCategory);
            product.setOriginalPrice(originalPrice);
            product.setDiscountedPrice(discountedPrice);
            product.setDiscountPercentage(discountPercentage);
            product.setDesc(desc);

            // Xử lý hình ảnh
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                try {
                    Files.write(filePath, image.getBytes());
                } catch (IOException e) {
                    return new ResponseEntity<>("Failed to upload image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
                String fileUrl = "http://localhost:8080/uploads/" + fileName;
                product.setImageUrl(fileUrl);
            } else if (imageUrl != null && !imageUrl.isEmpty()) {
                product.setImageUrl(imageUrl);
            }

            Product updatedProduct = productService.updateProduct(id, product);
            if (updatedProduct == null) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete a product by ID.
     *
     * @param id The ID of the product to delete.
     * @param request The HTTP request.
     * @return ResponseEntity with success or error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(HttpServletRequest request, @PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get products by category.
     *
     * @param category The category to filter products.
     * @param request The HTTP request.
     * @return List of products in the specified category.
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category, HttpServletRequest request) {
        List<Product> products = productService.getProductsByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    /**
     * Search products by name.
     *
     * @param name The name to search for.
     * @param request The HTTP request.
     * @return List of products matching the name.
     */
    @GetMapping("/search/{name}")
    public ResponseEntity<?> getProductsByName(@PathVariable String name, HttpServletRequest request) {
        List<Product> products = productService.getProductsByName(name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}