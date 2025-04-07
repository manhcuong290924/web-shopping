package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            HttpServletRequest request
    ) {
        try {
            Page<Order> orders = orderService.getAllOrders(page, size, search);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to fetch orders: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id, HttpServletRequest request) {
        try {
            Optional<Order> order = orderService.getOrderById(id);
            if (order.isPresent()) {
                return new ResponseEntity<>(order.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to fetch order: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, HttpServletRequest request) {
        try {
            // Kiểm tra các trường bắt buộc
            if (order.getEmail() == null || order.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (order.getFirstName() == null || order.getFirstName().trim().isEmpty()) {
                throw new IllegalArgumentException("First name is required");
            }
            if (order.getLastName() == null || order.getLastName().trim().isEmpty()) {
                throw new IllegalArgumentException("Last name is required");
            }
            if (order.getPhone() == null || order.getPhone().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone number is required");
            }
            if (order.getAddress() == null || order.getAddress().trim().isEmpty()) {
                throw new IllegalArgumentException("Address is required");
            }
            if (order.getProducts() == null || order.getProducts().isEmpty()) {
                throw new IllegalArgumentException("At least one product is required");
            }
            if (order.getPaymentMethod() == null || order.getPaymentMethod().trim().isEmpty()) {
                throw new IllegalArgumentException("Payment method is required");
            }

            // Kiểm tra từng sản phẩm trong danh sách
            for (var product : order.getProducts()) {
                if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                    throw new IllegalArgumentException("Product name is required");
                }
                if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                    throw new IllegalArgumentException("Category is required for product: " + product.getProductName());
                }
                if (product.getDiscountedPrice() < 0) {
                    throw new IllegalArgumentException("Discounted price must be non-negative for product: " + product.getProductName());
                }
                if (product.getDiscountPercentage() < 0) {
                    throw new IllegalArgumentException("Discount percentage must be non-negative for product: " + product.getProductName());
                }
                if (product.getQuantity() <= 0) {
                    throw new IllegalArgumentException("Quantity must be greater than 0 for product: " + product.getProductName());
                }
            }

            Order createdOrder = orderService.createOrder(order);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to create order: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @PathVariable String id,
            @RequestBody Order orderDetails,
            HttpServletRequest request
    ) {
        try {
            if (orderDetails.getEmail() == null || orderDetails.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (orderDetails.getFirstName() == null || orderDetails.getFirstName().trim().isEmpty()) {
                throw new IllegalArgumentException("First name is required");
            }
            if (orderDetails.getLastName() == null || orderDetails.getLastName().trim().isEmpty()) {
                throw new IllegalArgumentException("Last name is required");
            }
            if (orderDetails.getPhone() == null || orderDetails.getPhone().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone number is required");
            }
            if (orderDetails.getAddress() == null || orderDetails.getAddress().trim().isEmpty()) {
                throw new IllegalArgumentException("Address is required");
            }
            if (orderDetails.getProducts() == null || orderDetails.getProducts().isEmpty()) {
                throw new IllegalArgumentException("At least one product is required");
            }
            if (orderDetails.getPaymentMethod() == null || orderDetails.getPaymentMethod().trim().isEmpty()) {
                throw new IllegalArgumentException("Payment method is required");
            }

            for (var product : orderDetails.getProducts()) {
                if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
                    throw new IllegalArgumentException("Product name is required");
                }
                if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                    throw new IllegalArgumentException("Category is required for product: " + product.getProductName());
                }
                if (product.getDiscountedPrice() < 0) {
                    throw new IllegalArgumentException("Discounted price must be non-negative for product: " + product.getProductName());
                }
                if (product.getDiscountPercentage() < 0) {
                    throw new IllegalArgumentException("Discount percentage must be non-negative for product: " + product.getProductName());
                }
                if (product.getQuantity() <= 0) {
                    throw new IllegalArgumentException("Quantity must be greater than 0 for product: " + product.getProductName());
                }
            }

            Order updatedOrder = orderService.updateOrder(id, orderDetails);
            if (updatedOrder == null) {
                return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to update order: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(HttpServletRequest request, @PathVariable String id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to delete order: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Thêm endpoint để lấy tổng doanh thu từ các đơn hàng hoàn thành
    @GetMapping("/total-revenue")
    public ResponseEntity<Map<String, Double>> getTotalRevenue() {
        double totalRevenue = orderService.getTotalRevenue();
        Map<String, Double> response = new HashMap<>();
        response.put("totalRevenue", totalRevenue);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}