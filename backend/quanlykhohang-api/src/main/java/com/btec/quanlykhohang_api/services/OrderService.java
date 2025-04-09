package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.ProductOrder; // Thêm import
import com.btec.quanlykhohang_api.repositories.OrderRepository;
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
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(Order order) {
        try {
            for (var productOrder : order.getProducts()) {
                if (productOrder.getId() == null || productOrder.getId().trim().isEmpty()) {
                    List<Product> products = productRepository.findByNameContainingIgnoreCase(productOrder.getProductName());
                    if (products.isEmpty()) {
                        throw new RuntimeException("Không tìm thấy sản phẩm trong kho: " + productOrder.getProductName());
                    }
                    productOrder.setId(products.get(0).getId());
                }
            }

            order.setOrderDate(LocalDateTime.now());
            if (order.getOrderStatus() == null) {
                order.setOrderStatus("Chờ xử lý");
            }
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save order: " + e.getMessage());
        }
    }

    public Page<Order> getAllOrders(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        if (search != null && !search.trim().isEmpty()) {
            return orderRepository.findByEmailOrPhone(search, pageable);
        }
        return orderRepository.findAll(pageable);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order updateOrder(String id, Order orderDetails) {
        Optional<Order> existingOrderOpt = orderRepository.findById(id);
        if (!existingOrderOpt.isPresent()) {
            return null;
        }

        Order existingOrder = existingOrderOpt.get();
        String oldStatus = existingOrder.getOrderStatus();
        String newStatus = orderDetails.getOrderStatus();

        if (!"Hoàn thành".equals(oldStatus) && "Hoàn thành".equals(newStatus)) {
            for (var productOrder : orderDetails.getProducts()) {
                String productId = productOrder.getId();
                if (productId == null || productId.trim().isEmpty()) {
                    List<Product> products = productRepository.findByNameContainingIgnoreCase(productOrder.getProductName());
                    if (products.isEmpty()) {
                        throw new RuntimeException("Không tìm thấy sản phẩm trong kho: " + productOrder.getProductName());
                    }
                    productId = products.get(0).getId();
                    productOrder.setId(productId);
                }

                Optional<Product> productOpt = productRepository.findById(productId);
                if (productOpt.isPresent()) {
                    Product product = productOpt.get();
                    int newQuantity = product.getQuantity() - productOrder.getQuantity();
                    if (newQuantity < 0) {
                        throw new RuntimeException("Không đủ số lượng trong kho cho sản phẩm: " + product.getName());
                    }
                    product.setQuantity(newQuantity);
                    productRepository.save(product);
                } else {
                    throw new RuntimeException("Sản phẩm không tồn tại: " + productOrder.getProductName());
                }
            }
        }

        orderDetails.setId(id);
        return orderRepository.save(orderDetails);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public double getTotalRevenue() {
        List<Order> completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
        return completedOrders.stream()
                .mapToDouble(order -> order.getProducts().stream()
                        .mapToDouble(product -> product.getDiscountedPrice() * product.getQuantity())
                        .sum())
                .sum();
    }

    public int getSoldQuantity(String productId) {
        List<Order> completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
        return completedOrders.stream()
                .flatMap(order -> order.getProducts().stream())
                .filter(product -> productId.equals(product.getId()))
                .mapToInt(ProductOrder::getQuantity) // Sử dụng ProductOrder đã import
                .sum();
    }
}