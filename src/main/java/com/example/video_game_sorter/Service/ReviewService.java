package com.example.video_game_sorter.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Repo.ReviewRepo;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepo reviewRepository;

    
}
