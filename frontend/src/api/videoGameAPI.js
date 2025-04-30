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
  }
}

// function to filter the video games
export async function filterVideoGames(genres, platforms, gameModes) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        genres,
        platforms,
        gameModes,
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        if (params.genres) {
          params.genres.forEach((g) => searchParams.append("genres", g));
        }
        if (params.platforms) {
          params.platforms.forEach((p) => searchParams.append("platforms", p));
        }
        if (params.gameModes) {
          params.gameModes.forEach((m) => searchParams.append("gameModes", m));
        }
        return searchParams.toString();
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
