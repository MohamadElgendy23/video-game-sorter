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

    public void createVideoGame(VideoGame videoGame) {
        videoGameRepository.save(videoGame);
    }

    public void updateVideoGame(long id, VideoGame videoGame) {
        VideoGame updateVideoGame = videoGameRepository.findById(id).get();
        // update video game logic
        updateVideoGame.setTitle(videoGame.getTitle());
        updateVideoGame.setGenre(videoGame.getGenre());
        updateVideoGame.setDevelopers(videoGame.getDevelopers());
        updateVideoGame.setPlatforms(videoGame.getPlatforms());
        updateVideoGame.setGameModes(videoGame.getGameModes());
        updateVideoGame.setAverageRating(videoGame.getAverageRating());
        updateVideoGame.setReviews(videoGame.getReviews());
        videoGameRepository.save(updateVideoGame);
    }

    public void deleteVideoGame(long id) {
        VideoGame deleteVideoGame = videoGameRepository.findById(id).get();
        videoGameRepository.delete(deleteVideoGame);
    }
}
