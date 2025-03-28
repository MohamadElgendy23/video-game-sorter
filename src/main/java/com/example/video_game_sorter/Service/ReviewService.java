package com.example.video_game_sorter.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Repo.ReviewRepo;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepo reviewRepository;

    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    public void crea(VideoGame videoGame) {
        videoGameRepository.save(videoGame);
    }
}
