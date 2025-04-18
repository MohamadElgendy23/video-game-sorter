package com.example.video_game_sorter.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Services.ReviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;

// This class represents the review controller; ie. the routes for a review
@RestController
@RequestMapping(value="/api/reviews")
@CrossOrigin(origins="http://localhost:3000")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @GetMapping(value="/{videoGameId}")
    public List<Review> getReviews(@PathVariable long videoGameId) {
        return reviewService.getReviews(videoGameId);
    }

    @PostMapping
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return ResponseEntity.ok("Review added successfully.");
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<String> updateReview(@PathVariable Long id, @RequestBody Review review) {
        reviewService.updateReview(id, review);
        return ResponseEntity.ok("Review updated successfully.");
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully.");
    }
    
}
