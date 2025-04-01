// src/main/java/com/btec/quanlykhohang_api/controllers/AdminController.java
package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Admin;
import com.btec.quanlykhohang_api.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Create a new admin.
     *
     * @param admin The admin object containing email and password.
     * @return ResponseEntity with the created admin.
     */
    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        try {
            // Kiểm tra các trường bắt buộc
            if (admin.getEmail() == null || admin.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (admin.getPassword() == null || admin.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Password is required");
            }

            // Kiểm tra xem email đã tồn tại chưa
            if (adminService.getAdminByEmail(admin.getEmail()) != null) {
                return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
            }

            Admin createdAdmin = adminService.createAdmin(admin);
            return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get admin by email.
     *
     * @param email The email of the admin to retrieve.
     * @return ResponseEntity with the admin or error message.
     */
    @GetMapping("/{email}")
    public ResponseEntity<?> getAdminByEmail(@PathVariable String email) {
        Admin admin = adminService.getAdminByEmail(email);
        if (admin == null) {
            return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    /**
     * Admin login: Authenticate an admin and return admin info.
     *
     * @param loginRequest A map containing email and password.
     * @return ResponseEntity with the admin info or error message.
     */
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Find the admin by email
        Admin admin = adminService.getAdminByEmail(email);
        if (admin == null || !passwordEncoder.matches(password, admin.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        // Prepare response with admin info
        Map<String, Object> response = new HashMap<>();
        response.put("email", admin.getEmail());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}