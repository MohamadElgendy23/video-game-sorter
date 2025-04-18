package com.example.video_game_sorter.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Services.VideoGameService;
import com.example.video_game_sorter.Models.VideoGame;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;


// This class represents the video game controller; ie. the routes for a video game
@RestController
@RequestMapping("/api/videogames")
public class VideoGameController {
    
    @Autowired
    private VideoGameService videoGameService;

    @GetMapping
    public List<VideoGame> getAllVideoGames() {
        return videoGameService.getVideoGames();
    }

    @PostMapping
    public ResponseEntity<String> addVideoGame(@RequestBody VideoGame videoGame) {
        videoGameService.addVideoGame(videoGame);
        return ResponseEntity.ok("Video game added successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateVideoGame(@PathVariable Long id, @RequestBody VideoGame updatedGame) {
        videoGameService.updateVideoGame(id, updatedGame);
        return ResponseEntity.ok("Video game updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVideoGame(@PathVariable Long id) {
        videoGameService.deleteVideoGame(id);
        return ResponseEntity.ok("Video game deleted successfully.");
    }

}
