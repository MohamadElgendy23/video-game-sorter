package com.example.video_game_sorter.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Services.VideoGameService;
import com.example.video_game_sorter.Models.VideoGame;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


// This class represents the video game controller; ie. the routes for a video game
@RestController
public class VideoGameController {
    
    @Autowired
    private VideoGameService videoGameService;

    @GetMapping(value="/videogames")
    public String getVideoGames() {
        videoGameService.getVideoGames();
        return "Fetched video games successfully...";
    }

    @PostMapping(value="/addVideoGame")
    public String addVideoGame(@RequestBody VideoGame videoGame) {
        videoGameService.addVideoGame(videoGame);
        return "Added video game successfully...";
    }

    @PutMapping(value="/updateVideoGame")
    public String updateVideoGame(@RequestBody VideoGame videoGame) {
        videoGameService.updateVideoGame(videoGame);
        return "Updated video game successfully...";
    }

    @DeleteMapping(value="/deleteVideoGame")
    public String deleteVideoGame(@RequestBody VideoGame videoGame) {
        videoGameService.deleteVideoGame(videoGame);
        return "Deleted video game successfully...";
    }

}
