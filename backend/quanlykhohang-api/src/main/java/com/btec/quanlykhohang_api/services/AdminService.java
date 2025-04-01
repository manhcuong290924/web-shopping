// src/main/java/com/btec/quanlykhohang_api/services/AdminService.java
package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Admin;
import com.btec.quanlykhohang_api.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Thêm admin mới
    public Admin createAdmin(Admin admin) {
        // Mã hóa mật khẩu trước khi lưu
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    // Lấy admin theo email
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}