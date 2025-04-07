package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product addProduct(Product product) {
        product.setCreatedDate(LocalDateTime.now());
        return productRepository.save(product);
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product updateProduct(String id, Product productDetails) {
        if (productRepository.existsById(id)) {
            productDetails.setId(id);
            productDetails.setCreatedDate(LocalDateTime.now());
            return productRepository.save(productDetails);
        }
        return null;
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // Thêm phương thức để tính tổng số sản phẩm
    public long getTotalProducts() {
        return productRepository.count();
    }
}