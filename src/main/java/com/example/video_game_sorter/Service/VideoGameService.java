package com.example.video_game_sorter.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Models.VideoGame;
import com.example.video_game_sorter.Repo.VideoGameRepo;

// This class interacts with the video game repository
@Service
public class VideoGameService {
    
    @Autowired
    private VideoGameRepo videoGameRepository;
    
    public List<VideoGame> getVideoGames() {
        return videoGameRepository.findAll();
    }

    public void addVideoGame(VideoGame videoGame) {
        VideoGame existingVideoGame = videoGameRepository.findById(videoGame.getId())
              .orElse(null);
        if (existingVideoGame == null)
        {
            videoGameRepository.save(existingVideoGame);
        }
        else 
        {
            throw new RuntimeException("Video game already exists!");
        }
    }

    public void updateVideoGame(VideoGame videoGame) {
        VideoGame existingVideoGame = videoGameRepository.findById(videoGame.getId()).orElse(null);
        if (existingVideoGame == null) 
        {
            throw new RuntimeException("Video game does not exist!");
        }
        else 
        {
            // update video game logic
            existingVideoGame.setTitle(videoGame.getTitle());
            existingVideoGame.setGenre(videoGame.getGenre());
            existingVideoGame.setDevelopers(videoGame.getDevelopers());
            existingVideoGame.setPlatforms(videoGame.getPlatforms());
            existingVideoGame.setGameModes(videoGame.getGameModes());
            existingVideoGame.setAverageRating(videoGame.getAverageRating());
            existingVideoGame.setReviews(videoGame.getReviews());
            videoGameRepository.save(existingVideoGame);
        }
    }

    public void deleteVideoGame(VideoGame videoGame) {
        VideoGame existingVideoGame = videoGameRepository.findById(videoGame.getId()).orElse(null);
        if (existingVideoGame == null) 
        {
            throw new RuntimeException("Video game does not exist!");
        }
        else 
        {
            videoGameRepository.delete(existingVideoGame);
        }
    }
}
