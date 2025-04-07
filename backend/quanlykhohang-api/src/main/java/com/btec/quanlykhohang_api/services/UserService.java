package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.User;
import com.btec.quanlykhohang_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private Map<String, String> resetCodes = new HashMap<>();

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User updateUser(String id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthDay(updatedUser.getBirthDay());
            user.setActive(updatedUser.isActive());
            user.setPhone(updatedUser.getPhone());
            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public void sendResetCode(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("Email không tồn tại.");
        }
        String resetCode = String.format("%06d", new Random().nextInt(999999));
        resetCodes.put(email, resetCode);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("duongbtbh00626@fpt.edu.vn");
        message.setTo(email);
        message.setSubject("Mã xác nhận đặt lại mật khẩu");
        message.setText("Mã xác nhận của bạn là: " + resetCode + "\nMã này có hiệu lực trong 10 phút.");
        try {
            mailSender.send(message);
            System.out.println("Email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
            throw e; // Ném lại exception để frontend nhận được lỗi
        }
    }

    public void resetPassword(String email, String code, String newPassword) {
        String storedCode = resetCodes.get(email);
        if (storedCode == null || !storedCode.equals(code)) {
            throw new RuntimeException("Mã xác nhận không hợp lệ hoặc đã hết hạn.");
        }
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            resetCodes.remove(email);
        } else {
            throw new RuntimeException("Email không tồn tại.");
        }
    }

    public User signIn(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("Email không tồn tại.");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu.");
        }
        return user;
    }

    // Thêm phương thức để đếm tổng số người dùng
    public long getTotalUsers() {
        return userRepository.count();
    }
}