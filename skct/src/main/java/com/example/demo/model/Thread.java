package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name = "try_thread")
public class Thread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String user;
    private int likes;

    

    // Add a field for file URLs or metadata if needed
    // private String fileUrl;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

   

    // Manual validation methods
    public void validate() throws IllegalArgumentException {
        if (this.title == null || this.title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (this.content == null || this.content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
        if (this.user == null || this.user.trim().isEmpty()) {
            throw new IllegalArgumentException("User cannot be null or empty");
        }
    }
}

