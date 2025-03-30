package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public List<Product> getProductsByName(String name) {
        List<Product> products = getAllProducts();
        List<Product> searchedProducts = new ArrayList<>();
        for (Product product : products) {
            if (product.getName().contains(name)) {
                searchedProducts.add(product);
            }
        }
        return searchedProducts;
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
}
