package com.example.video_game_sorter.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Exceptions.Review.ReviewAlreadyExistsException;
import com.example.video_game_sorter.Exceptions.Review.ReviewNotFoundException;
import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Repo.ReviewRepo;

// This class interacts with the review repository
@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepo reviewRepository;

    public List<Review> getReviews(Long videoGameId) {
        
        // filter reviews based on video game id
        List<Review> filteredReviews = reviewRepository.findByVideoGameId(videoGameId);
        if (filteredReviews.isEmpty()){
            throw new ReviewNotFoundException("No reviews for this video game found!");
        }
        else 
        {
            return filteredReviews;
        }
    }

    public void addReview(Review review) {
        if (reviewRepository.existsById(review.getId())) {
            throw new ReviewAlreadyExistsException("Review already exists!");
        }
        reviewRepository.save(review);
    }

    public void updateReview(Long id, Review review) {
        Review existingReview = reviewRepository.findById(id)
            .orElseThrow(() -> new ReviewNotFoundException("Review not found for id: " + id));
        
        // update review logic
        existingReview.setReviewerName(review.getReviewerName());
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());
        existingReview.setVideoGame(review.getVideoGame());
        reviewRepository.save(existingReview);
    }

    public void deleteReview(Long id) {
        Review existingReview = reviewRepository.findById(id)
        .orElseThrow(() -> new ReviewNotFoundException("Review not found for id: " + id));

        reviewRepository.delete(existingReview);
    }


}
