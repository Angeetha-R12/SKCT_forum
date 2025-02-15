package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

@Service
public class UserService {
 @Autowired
 private UserRepo userRepository;

 // @Autowired
 // private PasswordEncoder passwordEncoder;

 public User registerUser(User user) {
     // Encrypt the password before saving the user
     // user.setPassword(passwordEncoder.encode(user.getPassword()));
     return userRepository.save(user);
 }

 public User findByEmail(String email) {
     return userRepository.findByEmail(email);
 }

}
