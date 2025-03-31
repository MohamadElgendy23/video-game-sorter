package com.example.video_game_sorter.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Service.ReviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


// This class represents the review controller; ie. the routes for a review
@RestController
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value="/reviews/{id}")
    public List<Review> getReviews(@PathVariable long id) {
        return reviewService.getReviews(id);
    }

    @PostMapping(value="/addReview")
    public String addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return "Added review successfully....";
    }
    
}
