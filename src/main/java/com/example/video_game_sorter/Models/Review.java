package com.example.video_game_sorter.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

// This class represents a video game for the application
@Entity
public class Review {

      // Fields (attributes of a review)
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private long id;

      @Column
      private String reviewerName;

      @Column
      private double rating;

      @Column
      private String comment;

      @ManyToOne
      @JoinColumn(name="video_game_id", nullable = false)
      private VideoGame videoGame;    

      // Getter and setter methods
      public long getId() {
        return id;
      }
      public void setId(long id) {
        this.id = id;
      }
      public String getReviewerName() {
          return reviewerName;
      }
      public void setReviewerName(String reviewerName) {
          this.reviewerName = reviewerName;
      }
      public double getRating() {
          return rating;
      }
      public void setRating(double rating) {
          this.rating = rating;
      }
      public String getComment() {
          return comment;
      }
      public void setComment(String comment) {
          this.comment = comment;
      }
      public VideoGame getVideoGame() {
        return videoGame;
      }
      public void setVideoGame(VideoGame videoGame) {
        this.videoGame = videoGame;
      }
  }
    
