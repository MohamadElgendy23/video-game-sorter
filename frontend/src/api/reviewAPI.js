// this file contains the reviews api handlers for the frontend
import axios from "axios";

const baseURL = "http://localhost:8080/api/reviews/";

// function to get the reviews
export async function getReviews(videoGameId) {
  try {
    const response = await axios.get(`${baseURL}/${videoGameId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function to add/create a vreview
export async function addReview(review) {
  try {
    const response = await axios.post(baseURL, review);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
}
