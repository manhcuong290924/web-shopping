// src/main/java/com/btec/quanlykhohang_api/controllers/AuthController.java
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

    /**
     * Sign-up: Create a new user.
     *
     * @param user The user object containing sign-up details.
     * @return ResponseEntity with the created user.
     */
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        // Check if the email already exists
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }

        // Set role mặc định là USER
        user.setRole("USER");
        // Save the user with a hashed password
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    /**
     * Sign-in: Authenticate a user and return user info.
     *
     * @param loginRequest A map containing email and password.
     * @return ResponseEntity with the firstName, lastName, role or error message.
     */
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Find the user by email
        User user = userService.getUserByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        // Prepare response with user info
        Map<String, Object> response = new HashMap<>();
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Admin sign-in: Authenticate an admin and return user info.
     *
     * @param loginRequest A map containing email and password.
     * @return ResponseEntity with the firstName, lastName, role or error message.
     */
    @PostMapping("/admin/sign-in")
    public ResponseEntity<?> adminSignIn(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Find the user by email
        User user = userService.getUserByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        // Kiểm tra role
        if (!"ADMIN".equals(user.getRole())) {
            return new ResponseEntity<>("You are not authorized to access admin panel", HttpStatus.FORBIDDEN);
        }

        // Prepare response with user info
        Map<String, Object> response = new HashMap<>();
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}