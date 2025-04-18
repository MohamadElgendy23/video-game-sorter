package com.example.video_game_sorter.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Services.ReviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


// This class represents the review controller; ie. the routes for a review
@RestController
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value="/reviews/{id}")
    public String getReviews(@PathVariable long id) {
        reviewService.getReviews(id);
        return "Fetched reviews for video game successfully...";
    }

    @PostMapping(value="/addReview")
    public String addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return "Added review successfully...";
    }

    @PutMapping(value="/updateReview")
    public String updateReview(@RequestBody Review review) {
        reviewService.updateReview(review);
        return "Updated review successfully...";
    }

    @DeleteMapping(value="/deleteReview")
    public String deleteReview(@RequestBody Review review) {
        reviewService.deleteReview(review);
        return "Deleted review successfully...";
    }
    
}
