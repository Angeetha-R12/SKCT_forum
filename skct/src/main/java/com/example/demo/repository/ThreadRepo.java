package com.example.demo.repository;
import com.example.demo.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepo extends JpaRepository<Thread, Long> {
}

