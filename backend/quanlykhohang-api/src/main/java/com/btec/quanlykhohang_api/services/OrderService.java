// src/main/java/com/btec/quanlykhohang_api/services/OrderService.java
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

    // Tạo đơn hàng mới
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now()); // Gán thời gian đặt hàng
        if (order.getOrderStatus() == null) {
            order.setOrderStatus("Chờ xử lý"); // Trạng thái mặc định
        }
        return orderRepository.save(order);
    }

    // Lấy danh sách đơn hàng với phân trang và tìm kiếm
    public Page<Order> getAllOrders(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        if (search != null && !search.trim().isEmpty()) {
            return orderRepository.findByEmailOrPhone(search, pageable);
        }
        return orderRepository.findAll(pageable);
    }

    // Lấy đơn hàng theo ID
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    // Cập nhật đơn hàng
    public Order updateOrder(String id, Order orderDetails) {
        if (orderRepository.existsById(id)) {
            orderDetails.setId(id);
            return orderRepository.save(orderDetails);
        }
        return null;
    }

    // Xóa đơn hàng
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}