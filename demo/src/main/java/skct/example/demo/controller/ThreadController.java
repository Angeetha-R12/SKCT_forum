package skct.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import skct.example.demo.model.Thread;
import skct.example.demo.service.ThreadService;


@RestController
@RequestMapping("/thread")
public class ThreadController {
    @Autowired
    private ThreadService threadService;

    @GetMapping
    public List<Thread> getAllThread() {
        return threadService.getAllThread();
    }

    @GetMapping("/{threadid}")
    public Thread getThreadById(@PathVariable Long id) {
        return threadService.getThreadById(id);
    }

    @PostMapping
    public Thread createThread(@RequestBody Thread thread) {
        return threadService.saveThread(thread);
    }

    @PutMapping("/{threadid}")
    public Thread updateThread(@PathVariable Long id, @RequestBody Thread thread) {
        thread.setid(id);
        return threadService.saveThread(thread);
    }

    @DeleteMapping("/{threadid}")
    public void deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
    }
}
