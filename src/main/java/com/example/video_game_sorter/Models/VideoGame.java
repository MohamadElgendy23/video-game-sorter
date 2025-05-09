package com.example.video_game_sorter.Models;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

// This class represents a video game for the application
@Entity
public class VideoGame {

    // Fields (attributes of the video game)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column
    private String image;

    @Column
    private String genre;

    @ElementCollection
    @CollectionTable(
        name = "video_game_developers",
        joinColumns = @JoinColumn(name="video_game_id")
    )
    @Column(name = "developer")
    private List<String> developers;

    @ElementCollection
    @CollectionTable(
        name = "video_game_platforms",
        joinColumns = @JoinColumn(name="video_game_id")
    )
    @Column(name = "platform")
    private List<String> platforms;  

    @ElementCollection
    @CollectionTable(
        name = "video_game_modes",
        joinColumns = @JoinColumn(name="video_game_id")
    )
    @Column(name="game_mode")
    private List<String> gameModes;   

    @Column
    private int releaseYear;

    @Column
    private double averageRating; 
    
    @OneToMany(mappedBy = "videoGame", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Review> reviews;     

    // Getter and setter methods
    public long getId() {
        return id;
    }
    public void setId(long id)
    {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }   
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }   
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }
    public List<String> getDevelopers() {
        return developers;
    }
    public void setDevelopers(List<String> developers) {
        this.developers = developers;
    }
    public List<String> getPlatforms() {
        return platforms;
    }
    public void setPlatforms(List<String> platforms) {
        this.platforms = platforms;
    }
    public List<String> getGameModes() {
        return gameModes;
    }
    public void setGameModes(List<String> gameModes) {
        this.gameModes = gameModes;
    }
    public int getReleaseYear() {
        return releaseYear;
    }
    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
    public double getAverageRating() {
        return averageRating;
    }
    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
    public List<Review> getReviews() {
        return reviews;
    }
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

}