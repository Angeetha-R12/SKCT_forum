package com.example.demo.controller;


import com.example.demo.model.Thread;
import com.example.demo.service.ThreadService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/threads")
public class ThreadController {

    private final ThreadService threadService;

    // Constructor injection for ThreadService
    public ThreadController(ThreadService threadService) {
        this.threadService = threadService;
    }

    @GetMapping
    public ResponseEntity<List<Thread>> getAllThreads() {
        List<Thread> threads = threadService.getAllThreads();
        return ResponseEntity.ok(threads);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable Long id) {
        Thread thread = threadService.getThreadById(id);
        return ResponseEntity.ok(thread);
    }

    @PostMapping
    public ResponseEntity<String> createThread(
        @RequestParam("thread") String threadJson,
        @RequestParam(value = "file", required = false) MultipartFile file) {
        
        try {
            // Convert JSON string to Thread object
            ObjectMapper objectMapper = new ObjectMapper();
            Thread thread = objectMapper.readValue(threadJson, Thread.class);
            
            // Handle file upload logic here, if a file is provided
            if (file != null && !file.isEmpty()) {
                // Implement file handling logic here, such as saving the file and updating the thread
                // For example, save the file and get its URL or path, then set it in the thread
                // String fileUrl = fileService.saveFile(file); // Implement this method
                // thread.setFileUrl(fileUrl);
            }

            // Save the thread
            threadService.createThread(thread);

            // Return success response
            return ResponseEntity.ok("Thread created successfully!");
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing the request: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
        return ResponseEntity.noContent().build();
    }
}

