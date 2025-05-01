package com.example.video_game_sorter.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Exceptions.VideoGame.VideoGameAlreadyExistsException;
import com.example.video_game_sorter.Exceptions.VideoGame.VideoGameNotFoundException;
import com.example.video_game_sorter.Models.Review;
import com.example.video_game_sorter.Models.VideoGame;
import com.example.video_game_sorter.Repo.VideoGameRepo;

import jakarta.transaction.Transactional;

// This class interacts with the video game repository
@Service
@Transactional
public class VideoGameService {
    
    @Autowired
    private VideoGameRepo videoGameRepository;
    
    public List<VideoGame> getVideoGames() {
        List<VideoGame> existingVideoGames = videoGameRepository.findAll();
        return existingVideoGames; // return empty list if no video games
    }

    public VideoGame getVideoGame(Long id) {
        VideoGame existingVideoGame = videoGameRepository.findById(id)
        .orElseThrow(() -> new VideoGameNotFoundException("Video game not found for id: " + id));

        return existingVideoGame;
    }

    public void addVideoGame(VideoGame videoGame) {
        if (videoGame == null) {
            throw new IllegalArgumentException("Video game cannot be null.");
        }
        
        if (videoGameRepository.existsById(videoGame.getId())) {
            throw new VideoGameAlreadyExistsException("Video game already exists!");
        }
    
        if (videoGame.getReviews() != null) {
            for (Review review : videoGame.getReviews()) {
                if (review != null) {
                    review.setVideoGame(videoGame);
                }
            }
        }
        videoGameRepository.save(videoGame);
    }

    public void updateVideoGame(Long id, VideoGame videoGame) {
        VideoGame existingVideoGame = videoGameRepository.findById(id)
                .orElseThrow(() -> new VideoGameNotFoundException("Video game not found for id: " + id));

        existingVideoGame.setTitle(videoGame.getTitle());
        existingVideoGame.setImage(videoGame.getImage());
        existingVideoGame.setGenre(videoGame.getGenre());
        existingVideoGame.setDevelopers(videoGame.getDevelopers());
        existingVideoGame.setPlatforms(videoGame.getPlatforms());
        existingVideoGame.setGameModes(videoGame.getGameModes());
        existingVideoGame.setAverageRating(videoGame.getAverageRating());
        existingVideoGame.setReviews(videoGame.getReviews());
        videoGameRepository.save(existingVideoGame);
    }

    public void deleteVideoGame(Long id) {
        VideoGame existingVideoGame = videoGameRepository.findById(id)
                .orElseThrow(() -> new VideoGameNotFoundException("Video game not found for id: " + id));
        videoGameRepository.delete(existingVideoGame);
    }
}
