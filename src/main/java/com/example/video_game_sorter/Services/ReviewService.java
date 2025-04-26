package com.example.video_game_sorter.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
