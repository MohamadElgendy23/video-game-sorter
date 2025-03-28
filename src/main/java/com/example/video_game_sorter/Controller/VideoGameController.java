package com.example.video_game_sorter.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Service.VideoGameService;
import com.example.video_game_sorter.Models.VideoGame;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


// This class represents the video game controller; ie. the routes for a video game
@RestController
public class VideoGameController {
    
    @Autowired
    private VideoGameService videoGameService;

    @GetMapping(value="/videogames")
    public List<VideoGame> getVideoGames() {
        return videoGameService.getVideoGames();
    }

    @PostMapping(value="/createVideoGame")
    public String createVideoGame(@RequestBody VideoGame videoGame) {
        videoGameService.createVideoGame(videoGame);
        return "Created video game successfully....";
    }

    @PutMapping(value="/updateVideoGame/{id}")
    public String updateVideoGame(@PathVariable long id, @PathVariable  @RequestBody VideoGame videoGame) {
        videoGameService.updateVideoGame(id, videoGame);
        return "Updated video game successfully....";
    }

    @DeleteMapping(value="/deleteVideoGame/{id}")
    public String deleteVideoGame(@PathVariable long id) {
        videoGameService.deleteVideoGame(id);
        return "Deleted video game successfully....";
    }

}
