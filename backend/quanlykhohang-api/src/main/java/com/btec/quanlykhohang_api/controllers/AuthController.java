package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email đã được sử dụng.", HttpStatus.BAD_REQUEST);
        }
        user.setRole("USER");
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        User user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("Email không tồn tại.", HttpStatus.UNAUTHORIZED);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Sai mật khẩu.", HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole());
        response.put("id", user.getId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/admin/sign-in")
    public ResponseEntity<?> adminSignIn(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        User user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("Email không tồn tại.", HttpStatus.UNAUTHORIZED);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Sai mật khẩu.", HttpStatus.UNAUTHORIZED);
        }
        if (!"ADMIN".equals(user.getRole())) {
            return new ResponseEntity<>("Bạn không có quyền truy cập panel admin.", HttpStatus.FORBIDDEN);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole());
        response.put("id", user.getId());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return new ResponseEntity<>("Token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }
        String token = authorization.substring(7);
        User user = userService.getUserById(token).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("Người dùng không tồn tại hoặc token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole());
        response.put("id", user.getId());
        response.put("birthDay", user.getBirthDay());
        response.put("phone", user.getPhone());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            userService.sendResetCode(email);
            return new ResponseEntity<>("Mã xác nhận đã được gửi đến email của bạn.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        String newPassword = request.get("newPassword");
        try {
            userService.resetPassword(email, code, newPassword);
            return new ResponseEntity<>("Mật khẩu đã được đặt lại thành công.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Thêm endpoint cập nhật thông tin người dùng
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authorization, @RequestBody User updatedUser) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return new ResponseEntity<>("Token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }
        String token = authorization.substring(7);
        User user = userService.getUserById(token).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("Người dùng không tồn tại hoặc token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }

        try {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthDay(updatedUser.getBirthDay());
            user.setPhone(updatedUser.getPhone());
            User savedUser = userService.updateUser(user.getId(), user);

            Map<String, Object> response = new HashMap<>();
            response.put("firstName", savedUser.getFirstName());
            response.put("lastName", savedUser.getLastName());
            response.put("role", savedUser.getRole());
            response.put("id", savedUser.getId());
            response.put("birthDay", savedUser.getBirthDay());
            response.put("phone", savedUser.getPhone());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cập nhật thông tin thất bại.", HttpStatus.BAD_REQUEST);
        }
    }

    // Thêm endpoint đổi mật khẩu
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> request) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return new ResponseEntity<>("Token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }
        String token = authorization.substring(7);
        User user = userService.getUserById(token).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("Người dùng không tồn tại hoặc token không hợp lệ.", HttpStatus.UNAUTHORIZED);
        }

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return new ResponseEntity<>("Mật khẩu hiện tại không đúng.", HttpStatus.BAD_REQUEST);
        }

        try {
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user.getId(), user);
            return new ResponseEntity<>("Đổi mật khẩu thành công.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Đổi mật khẩu thất bại.", HttpStatus.BAD_REQUEST);
        }
    }
}