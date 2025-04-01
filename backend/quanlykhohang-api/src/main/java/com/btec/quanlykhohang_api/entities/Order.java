// src/main/java/com/btec/quanlykhohang_api/entities/Order.java
package com.btec.quanlykhohang_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    // Thông tin từ User
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String address; // Thêm trường địa chỉ
    private String note; // Thêm trường thông tin bổ sung

    // Danh sách sản phẩm
    private List<ProductOrder> products;

    // Thông tin bổ sung
    private String paymentMethod; // Phương thức thanh toán (ví dụ: "Thanh toán khi nhận hàng", "Chuyển khoản")
    private String orderStatus; // Trạng thái đơn hàng (ví dụ: "Chờ xử lý", "Đang giao", "Hoàn thành")
    private LocalDateTime orderDate; // Thời gian đặt hàng

    // Getters và Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<ProductOrder> getProducts() {
        return products;
    }

    public void setProducts(List<ProductOrder> products) {
        this.products = products;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}