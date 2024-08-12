package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody User loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        // User password = userService.findByEmail(loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}
