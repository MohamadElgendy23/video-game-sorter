package com.example.video_game_sorter.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Services.ReviewService;
import org.springframework.web.bind.annotation.RequestMapping;

// This class represents the review controller; ie. the routes for a review
@RestController
@RequestMapping(value="/api/reviews")
@CrossOrigin(origins="http://localhost:5173/")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value="/{videoGameId}")
    public List<Review> getReviews(@PathVariable long videoGameId) {
        return reviewService.getReviews(videoGameId);
    }
    
}
