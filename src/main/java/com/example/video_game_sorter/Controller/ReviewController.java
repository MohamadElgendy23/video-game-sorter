package com.example.video_game_sorter.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Models.VideoGame;
import com.example.video_game_sorter.Service.ReviewService;

// This class represents the review controller; ie. the routes for a review
@RestController
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value="/reviews")
    public List<VideoGame> getReviews() {
        return reviewService.getReviews();
    }
}
