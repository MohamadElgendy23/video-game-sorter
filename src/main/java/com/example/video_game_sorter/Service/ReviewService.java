package com.example.video_game_sorter.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Repo.ReviewRepo;

// This class interacts with the review repository
@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepo reviewRepository;

    public List<Review> getReviews(long id) {
        return reviewRepository.findAll(review -> review.getVideoGame().getId() == id);
    }

    public void addReview(Review review) {
        Review existingReview = reviewRepository.findById(review.getId())
              .orElse(null);
        if (existingReview == null)
        {
            reviewRepository.save(existingReview);
        }
        else 
        {
            throw new RuntimeException("Review already exists!");
        }
    }

    public void updateReview(Review review) {
        Review existingReview = reviewRepository.findById(review.getId()).orElse(null);
        if (existingReview == null)
        {
            throw new RuntimeException("Review does not exist!");
        }
        else 
        {
            // update review logic
            existingReview.setReviewerName(review.getReviewerName());
            existingReview.setRating(review.getRating());
            existingReview.setComment(review.getComment());
            existingReview.setVideoGame(review.getVideoGame());
            reviewRepository.save(existingReview);
        }
    }

    public void deleteReview(Review review) {
        Review existingReview = reviewRepository.findById(review.getId()).orElse(null);
        if (existingReview == null) 
        {
            throw new RuntimeException("Review does not exist!");
        }
        else 
        {
            reviewRepository.delete(existingReview);
        }
    }


}
