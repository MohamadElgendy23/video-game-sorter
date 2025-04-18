package com.example.video_game_sorter.Exceptions.VideoGame;

public class VideoGameAlreadyExistsException extends RuntimeException {
    public VideoGameAlreadyExistsException(String message) {
        super(message);
    }
}
