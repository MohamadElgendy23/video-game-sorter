package com.example.video_game_sorter.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.video_game_sorter.Exceptions.VideoGame.VideoGameAlreadyExistsException;
import com.example.video_game_sorter.Exceptions.VideoGame.VideoGameNotFoundException;
import com.example.video_game_sorter.Models.VideoGame;
import com.example.video_game_sorter.Repo.VideoGameRepo;

// This class interacts with the video game repository
@Service
public class VideoGameService {
    
    @Autowired
    private VideoGameRepo videoGameRepository;
    
    public List<VideoGame> getVideoGames() {
        List<VideoGame> existingVideoGames = videoGameRepository.findAll();
        if (existingVideoGames.isEmpty()) {
            throw new VideoGameNotFoundException("No video games found!");
        }
        return existingVideoGames;
    }

    public VideoGame getVideoGame(Long id) {
        VideoGame existingVideoGame = videoGameRepository.findById(id)
        .orElseThrow(() -> new VideoGameNotFoundException("Video game not found for id: " + id));

        return existingVideoGame;
    }

    public void addVideoGame(VideoGame videoGame) {
        if (videoGameRepository.existsById(videoGame.getId())) {
            throw new VideoGameAlreadyExistsException("Video game already exists!");
        }
        videoGameRepository.save(videoGame);
    }

    public void updateVideoGame(Long id, VideoGame videoGame) {
        VideoGame existingVideoGame = videoGameRepository.findById(id)
                .orElseThrow(() -> new VideoGameNotFoundException("Video game not found for id: " + id));

        existingVideoGame.setTitle(videoGame.getTitle());
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
