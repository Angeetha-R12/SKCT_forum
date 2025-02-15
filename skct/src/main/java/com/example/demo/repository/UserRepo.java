package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
    // Optional<User> findByEmail(String email);
}
