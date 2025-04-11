package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public ProductService(ProductRepository productRepository, MongoTemplate mongoTemplate) {
        this.productRepository = productRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product productDetails) {
        if (productRepository.existsById(id)) {
            productDetails.setId(id);
            return productRepository.save(productDetails);
        }
        return null;
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        logger.info("Fetching products by category: {}", category);
        List<Product> products = productRepository.findByCategory(category);
        logger.info("Found {} products in category '{}': {}", products.size(), category, products);
        return products;
    }

    public List<Product> getProductsByName(String name) {
        logger.info("Searching products with name containing: {}", name);
        // Lấy tất cả sản phẩm và lọc thủ công trong bộ nhớ
        List<Product> allProducts = mongoTemplate.findAll(Product.class, "products");
        List<Product> products = allProducts.stream()
                .filter(p -> p.getName() != null && p.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
        logger.info("Found {} products with name containing '{}': {}", products.size(), name, products);
        return products;
    }

    public long getTotalProducts() {
        return productRepository.count();
    }

    public Page<Product> getProductsByQuantity(int minQuantity, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByQuantityGreaterThanEqual(minQuantity, pageable);
    }
}