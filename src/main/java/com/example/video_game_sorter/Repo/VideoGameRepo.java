package com.example.video_game_sorter.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.video_game_sorter.Models.VideoGame;

// This interface handles CRUD operations for the VideoGame entity
public interface VideoGameRepo extends JpaRepository<VideoGame, Long> {
    public List<VideoGame> findByTitleContainingIgnoreCase(String title);
}
    
