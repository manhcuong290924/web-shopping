package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Admin;
import com.btec.quanlykhohang_api.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final String SECRET_KEY = "your-secret-key"; // Thay bằng key bí mật của bạn
    private static final long EXPIRATION_TIME = 864_000_000; // 10 ngày

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Admin admin = adminService.getAdminByEmail(email);
        if (admin == null || !passwordEncoder.matches(password, admin.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        String token = createJwtToken(email);

        Map<String, Object> response = new HashMap<>();
        response.put("email", admin.getEmail());
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> adminLogout() {
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    @GetMapping("/total-users")
    public ResponseEntity<?> getTotalUsers() {
        long totalUsers = adminService.getTotalUsers();
        Map<String, Long> response = new HashMap<>();
        response.put("totalUsers", totalUsers);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Thêm endpoint đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Map<String, String> registerRequest) {
        String email = registerRequest.get("email");
        String password = registerRequest.get("password");

        // Kiểm tra xem email đã tồn tại chưa
        if (adminService.getAdminByEmail(email) != null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        // Tạo admin mới
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(password); // Mật khẩu sẽ được mã hóa trong AdminService
        Admin createdAdmin = adminService.createAdmin(admin);

        Map<String, String> response = new HashMap<>();
        response.put("id", createdAdmin.getId());
        response.put("email", createdAdmin.getEmail());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    private String createJwtToken(String email) {
        long now = System.currentTimeMillis();
        String header = Base64.getUrlEncoder().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());
        String payload = Base64.getUrlEncoder().encodeToString(
                String.format("{\"sub\":\"%s\",\"iat\":%d,\"exp\":%d}", email, now / 1000, (now + EXPIRATION_TIME) / 1000)
                        .getBytes());

        String signatureInput = header + "." + payload;
        String signature = hmacSha256(signatureInput, SECRET_KEY);

        return header + "." + payload + "." + signature;
    }

    private String hmacSha256(String data, String key) {
        try {
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate HMAC", e);
        }
    }
}