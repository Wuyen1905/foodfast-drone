package com.foodfast.service;

import com.foodfast.entity.User;
import com.foodfast.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User authenticate(String username, String password) {
        if (username == null || password == null) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // NOTE: H2 is storing plaintext passwords → compare raw strings
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    @Transactional
    public User register(String username, String password, String name, String email, String phone) {
        // Check if username already exists
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        // Check if email already exists
        if (email != null && !email.isBlank() && userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        // Check if phone already exists
        if (phone != null && !phone.isBlank() && userRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException("Phone already exists");
        }

        User user = new User();
        user.setId("CUS-" + System.currentTimeMillis());
        user.setUsername(username);
        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setRole("customer");
        user.setOrderCount(0);
        user.setCreatedAt(System.currentTimeMillis());

        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void updateUserRole(String userId, String newRole) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setRole(newRole);
            userRepository.save(user);
        }
    }
}

