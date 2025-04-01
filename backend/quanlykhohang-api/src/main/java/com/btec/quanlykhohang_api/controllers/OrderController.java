// src/main/java/com/btec/quanlykhohang_api/controllers/OrderController.java
package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Get all orders with pagination and search.
     *
     * @param page The page number (default is 0).
     * @param size The number of items per page (default is 10).
     * @param search The search term to filter by email or phone (optional).
     * @param request The HTTP request.
     * @return ResponseEntity with the list of orders for the requested page.
     */
    @GetMapping
    public ResponseEntity<?> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            HttpServletRequest request
    ) {
        Page<Order> orders = orderService.getAllOrders(page, size, search);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /**
     * Get an order by ID.
     *
     * @param id The ID of the order to retrieve.
     * @param request The HTTP request.
     * @return ResponseEntity with the order or error message.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id, HttpServletRequest request) {
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            return new ResponseEntity<>(order.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Create a new order.
     *
     * @param order The order object containing user info and list of products.
     * @param request The HTTP request.
     * @return The created order.
     */
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
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Update an order by ID.
     *
     * @param id The ID of the order to update.
     * @param orderDetails The updated order details.
     * @param request The HTTP request.
     * @return The updated order.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @PathVariable String id,
            @RequestBody Order orderDetails,
            HttpServletRequest request
    ) {
        try {
            // Kiểm tra các trường bắt buộc
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

            // Kiểm tra từng sản phẩm trong danh sách
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
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete an order by ID.
     *
     * @param id The ID of the order to delete.
     * @param request The HTTP request.
     * @return ResponseEntity with success or error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(HttpServletRequest request, @PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}