package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        try {
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
        if (orderRepository.existsById(id)) {
            orderDetails.setId(id);
            return orderRepository.save(orderDetails);
        }
        return null;
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}