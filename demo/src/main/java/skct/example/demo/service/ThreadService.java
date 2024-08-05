package skct.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import skct.example.demo.model.Thread;
import skct.example.demo.repository.ThreadRepository;

@Service
public class ThreadService {
    @Autowired
    private ThreadRepository threadRepository;

    public List<Thread> getAllThread() {
        return threadRepository.findAll();
    }

    public Thread getThreadById(Long id) {
        return threadRepository.findById(id).orElse(null);
    }

    public Thread saveThread(Thread thread) {
        return threadRepository.save(thread);
    }

    public void deleteThread(Long id) {
        threadRepository.deleteById(id);
    }
}
