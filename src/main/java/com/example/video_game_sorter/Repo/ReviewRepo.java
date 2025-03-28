package com.example.video_game_sorter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.video_game_sorter.Models.Review;

// This interface handles CRUD operations for the Review entity
public interface ReviewRepo extends JpaRepository<Review, Long> {
    
}
