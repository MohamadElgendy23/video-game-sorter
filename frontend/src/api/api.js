// this file contains the api handlers for the frontend
import axios from "axios";

const baseURL = "http://localhost:8080/api/videogames/";

export async function getVideoGames() {
  try {
    const response = await axios.get(baseURL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getVideoGame(id) {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
