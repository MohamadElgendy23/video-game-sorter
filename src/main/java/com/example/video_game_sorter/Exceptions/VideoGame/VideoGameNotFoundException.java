package com.example.video_game_sorter.Exceptions.VideoGame;

public class VideoGameNotFoundException extends RuntimeException {
    public VideoGameNotFoundException(String message) {
        super(message);
    }
}