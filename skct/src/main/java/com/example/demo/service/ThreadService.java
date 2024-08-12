package com.example.demo.service;

import com.example.demo.model.Thread;
import com.example.demo.repository.ThreadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepo threadRepo;

    public Thread createThread(Thread thread) {
        return threadRepo.save(thread);
    }

    public List<Thread> getAllThreads() {
        return threadRepo.findAll();
    }

    public Thread getThreadById(Long id) {
        return threadRepo.findById(id).orElse(null);
    }

    public Thread updateThread(Long id, Thread thread) {
        if (!threadRepo.existsById(id)) {
            return null;
        }
        thread.setId(id);
        return threadRepo.save(thread);
    }

    public boolean deleteThread(Long id) {
        if (!threadRepo.existsById(id)) {
            return false;
        }
        threadRepo.deleteById(id);
        return true;
    }
}