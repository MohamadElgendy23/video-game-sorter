// this file contains the video game api handlers for the frontend
import axios from "axios";

const baseURL = "http://localhost:8080/api/videogames";

// function to get the video games
export async function getVideoGames() {
  try {
    const response = await axios.get(baseURL);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// function to get a video game by id
export async function getVideoGame(id) {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function to add/create a video game
export async function addVideoGame(newGame) {
  try {
    const response = await axios.post(baseURL, newGame);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
}

// function to update a video game
export async function updateVideoGame(id, updatedGame) {
  try {
    const response = await axios.put(`${baseURL}/${id}`, updatedGame);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error updating game:", error);
  }
}

// function to delete a video game by id
export async function deleteVideoGame(id) {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error deleting game:", error);
  }
}

// function to delete all video games
export async function deleteAllVideoGames() {
  try {
    const games = await getVideoGames();
    if (!Array.isArray(games) || games.length === 0) {
      return "No games to delete";
    }
    
    const deletePromises = games.map(game => deleteVideoGame(game.id));
    await Promise.all(deletePromises);
    return "All games deleted successfully";
  } catch (error) {
    console.error("Error deleting all games:", error);
    return "Failed to delete all games";
  }
}
