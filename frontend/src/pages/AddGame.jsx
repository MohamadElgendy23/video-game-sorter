import React, { useState, useEffect } from "react";
import { addVideoGame } from "../api/videoGameAPI.js";
import { addReview } from "../api/reviewAPI.js";
import {
  platforms as platformsArr,
  gameModes as gameModesArr,
} from "../data/data.js";

// Get any existing data in localStorage
const existingTitle = () =>
  localStorage.getItem("title")
    ? JSON.parse(localStorage.getItem("title"))
    : "";
const existingImage = () =>
  localStorage.getItem("image")
    ? JSON.parse(localStorage.getItem("image"))
    : "";
const existingGenre = () =>
  localStorage.getItem("genre")
    ? JSON.parse(localStorage.getItem("genre"))
    : "";
const existingDevelopers = () =>
  localStorage.getItem("developers")
    ? JSON.parse(localStorage.getItem("developers"))
    : [];
const existingPlatforms = () =>
  localStorage.getItem("platforms")
    ? JSON.parse(localStorage.getItem("platforms"))
    : [];
const existingGameModes = () =>
  localStorage.getItem("gameModes")
    ? JSON.parse(localStorage.getItem("gameModes"))
    : [];
const existingReleaseYear = () =>
  localStorage.getItem("releaseYear")
    ? JSON.parse(localStorage.getItem("releaseYear"))
    : "2016";
const existingAverageRatings = () =>
  localStorage.getItem("averageRating")
    ? Number(JSON.parse(localStorage.getItem("averageRating")))
    : 0;
const existingReviews = () =>
  localStorage.getItem("reviews")
    ? JSON.parse(localStorage.getItem("reviews"))
    : [];
const existingNewReview = () =>
  localStorage.getItem("newReview")
    ? JSON.parse(localStorage.getItem("newReview"))
    : {
        reviewerName: "",
        rating: "1",
        comment: "",
      };

function AddGame() {
  const [title, setTitle] = useState(existingTitle());
  const [image, setImage] = useState(existingImage());
  const [genre, setGenre] = useState(existingGenre());
  const [developers, setDevelopers] = useState(existingDevelopers());
  const [platforms, setPlatforms] = useState(existingPlatforms());
  const [gameModes, setGameModes] = useState(existingGameModes());
  const [releaseYear, setReleaseYear] = useState(existingReleaseYear());
  const [averageRating, setAverageRating] = useState(existingAverageRatings());
  const [reviews, setReviews] = useState(existingReviews);
  const [newReview, setNewReview] = useState(existingNewReview());

  const [loading, setLoading] = useState(false);

  // save to local storage when fields change
  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(title));
  }, [title]);
  useEffect(() => {
    localStorage.setItem("image", JSON.stringify(image));
  }, [image]);
  useEffect(() => {
    localStorage.setItem("genre", JSON.stringify(genre));
  }, [genre]);
  useEffect(() => {
    localStorage.setItem("developers", JSON.stringify(developers));
  }, [developers]);
  useEffect(() => {
    localStorage.setItem("platforms", JSON.stringify(platforms));
  }, [platforms]);
  useEffect(() => {
    localStorage.setItem("gameModes", JSON.stringify(gameModes));
  }, [gameModes]);
  useEffect(() => {
    localStorage.setItem("releaseYear", JSON.stringify(releaseYear));
  }, [releaseYear]);
  useEffect(() => {
    localStorage.setItem("averageRating", JSON.stringify(averageRating));
  }, [averageRating]);
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    localStorage.setItem("newReview", JSON.stringify(newReview));
  }, [newReview]);

  function handleDevelopersChange(event) {
    const input = event.target.value;
    const developers = input.split(",").map((developer) => developer.trim());
    setDevelopers(developers);
  }

  function handlePlatformsChange(event) {
    const { value, checked } = event.target;
    let currPlatforms = [...platforms];

    if (value === "All") {
      if (checked) {
        currPlatforms = [...platformsArr];
      } else {
        currPlatforms = [];
      }
    } else {
      if (checked) {
        if (!currPlatforms.includes(value)) {
          currPlatforms.push(value);
        }
      } else {
        currPlatforms = currPlatforms.filter((platform) => platform !== value);
      }
    }

    setPlatforms(currPlatforms);

    localStorage.setItem("platforms", JSON.stringify(currPlatforms));
  }

  function handleGameModesChange(event) {
    const { value, checked } = event.target;
    let currGameModes = [...gameModes];

    if (value === "All") {
      if (checked) {
        currGameModes = [...gameModesArr];
      } else {
        currGameModes = [];
      }
    } else {
      if (checked) {
        if (!currGameModes.includes(value)) {
          currGameModes.push(value);
        }
      } else {
        currGameModes = currGameModes.filter((platform) => platform !== value);
      }
    }

    setGameModes(currGameModes);

    localStorage.setItem("gameModes", JSON.stringify(currGameModes));
  }

  function handleNewReviewChange(event) {
    const { name, value } = event.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSaveReview() {
    if (!newReview.reviewerName || !newReview.rating || !newReview.comment) {
      return;
    }
    setReviews((prev) => [...prev, newReview]);

    // calculate average rating of reviews on the fly (if there contains reviews)
    let avgRating = 0;
    if (reviews.length > 0) {
      avgRating = (
        reviews
          .map((review) => parseFloat(review.rating))
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) / reviews.length
      ).toFixed(1);
    }
    setAverageRating(avgRating);

    setNewReview({ reviewerName: "", rating: "1", comment: "" });
  }

  // called when the form is submitted (with all required fields)
  async function handleSubmit(event) {
    event.preventDefault();

    // Construct form data to be submitted
    const videoGameFormData = {
      title,
      genre,
      developers,
      platforms,
      gameModes,
      releaseYear: parseInt(releaseYear),
      averageRating,
      reviews,
    };

    setLoading(true);
    await addVideoGame(videoGameFormData);
    setLoading(false);

    // clear when complete
    clearFormFields();
  }

  // function to clear/reset the form fields
  function clearFormFields() {
    setTitle("");
    setImage("");
    setGenre("");
    setDevelopers([]);
    setPlatforms([]);
    setGameModes([]);
    setReleaseYear("2016");
    setAverageRating(0);
    setReviews([]);
    setNewReview({
      reviewerName: "",
      rating: "1",
      comment: "",
    });
  }

  return (
    <section className="py-10 px-6 flex justify-center items-center flex-col">
      <h2 className="text-5xl text-white font-semibold text-center mb-10">
        Add New Video Game
      </h2>
      <form
        className="p-4 space-y-4 bg-[#f2f2f2] shadow-md w-1/3 rounded-md"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Game Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Image (URL)
          </label>
          {/* <input
            type="file"
            id="image"
            name="image"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            accept="image/png, image/jpeg"
          /> */}
          <input
            type="text"
            id="image"
            name="image"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select a genre</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="MMORPG">MMORPG</option>
            <option value="Shooter">Shooter</option>
            <option value="Stealth">Stealth</option>
            <option value="Racing">Racing</option>
            <option value="Sports">Sports</option>
            <option value="Simulation">Simulation</option>
            <option value="Strategy">Strategy</option>
            <option value="MOBA">MOBA</option>
            <option value="Survival">Survival</option>
            <option value="Horror">Horror</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="developers"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Developers
          </label>
          <input
            type="text"
            id="developers"
            name="developers"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
            placeholder="Enter developer names, separated by commas"
            value={developers}
            onChange={(e) => handleDevelopersChange(e)}
          />
        </div>

        <div>
          <label
            htmlFor="platforms"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Platforms
          </label>

          <div className="mt-1 grid grid-cols-2 gap-2">
            <label key="All" className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platforms"
                id="platforms"
                value="All"
                checked={platforms.length === platformsArr.length}
                onChange={(e) => handlePlatformsChange(e)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span>All</span>
            </label>
            {platformsArr.slice(1).map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="platforms"
                  id="platforms"
                  value={platform}
                  checked={platforms.includes(platform)}
                  onChange={(e) => handlePlatformsChange(e)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span>{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="gameModes"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Game Modes
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <label key="All" className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="gameModes"
                id="gameModes"
                value="All"
                checked={gameModes.length === gameModesArr.length}
                onChange={(e) => handleGameModesChange(e)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span>All</span>
            </label>
            {gameModesArr.slice(0).map((gameMode) => (
              <label key={gameMode} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="gameModes"
                  id="gameModes"
                  value={gameMode}
                  checked={gameModes.includes(gameMode)}
                  onChange={(e) => handleGameModesChange(e)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span>{gameMode}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="releaseYear"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Release Year
          </label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            min="1900"
            max="2099"
            step="1"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="averageRating"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Average Rating (calculated)
          </label>
          <p
            id="averageRating"
            className="mt-1 p-3 border border-gray-300 rounded-md text-gray-800"
          >
            {averageRating === 0 ? "No reviews yet" : averageRating}
          </p>
        </div>

        <div>
          <label
            htmlFor="reviews"
            className="block text-sm font-extrabold text-gray-700 text-center lg:text-start"
          >
            Reviews
          </label>
          <div className="mt-1 block w-full p-3 border border-gray-300 rounded-md">
            <label
              htmlFor="reviewerName"
              className="block text-sm font-semibold text-gray-700 text-center lg:text-start"
            >
              Reviewer Name
            </label>
            <input
              type="text"
              id="reviewerName"
              name="reviewerName"
              value={newReview.reviewerName}
              onChange={(e) => handleNewReviewChange(e)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            />
            <label
              htmlFor="rating"
              className="mt-1 block text-sm font-semibold text-gray-700 text-center lg:text-start"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={newReview.rating}
              onChange={(e) => handleNewReviewChange(e)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            />
            <label
              htmlFor="comment"
              className="mt-1 block text-sm font-semibold text-gray-700 text-center lg:text-start"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              placeholder="Write your comment here"
              required
              value={newReview.comment}
              onChange={(e) => handleNewReviewChange(e)}
            ></textarea>
            <button
              type="button"
              className="px-3 py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
              onClick={handleSaveReview}
            >
              Save Review
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            {loading ? "Saving..." : "Save Game"}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer"
            onClick={clearFormFields}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddGame;
