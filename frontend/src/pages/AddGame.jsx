import React, { useState } from "react";
import { addVideoGame } from "../api/videoGameAPI.js";
import { addReview } from "../api/reviewAPI.js";
import {
  platforms as platformsArr,
  gameModes as gameModesArr,
} from "../data/data.js";

function AddGame() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [gameModes, setGameModes] = useState([]);
  const [releaseYear, setReleaseYear] = useState("2016");
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: "1",
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  function handleDevelopersChange(event) {
    const input = event.target.value;
    const developers = input.split(",").map((developer) => developer.trim());
    setDevelopers(developers);
  }

  function handlePlatformsChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      platforms.push(value);
    } else {
      platforms.splice(platforms.indexOf(value), 1);
    }
    setPlatforms((prev) => [...prev, platforms]);
  }

  function handleGameModesChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      gameModes.push(value);
    } else {
      gameModes.splice(gameModes.indexOf(value), 1);
    }
    setGameModes((prev) => [...prev, gameModes]);
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
    setAverageRating();
    setNewReview({ reviewerName: "", rating: "1", comment: "" });
  }

  // called when the form is submitted (with all required fields)
  async function handleSubmit(event) {
    event.preventDefault();

    let avgRating = 0;

    // calculate average rating if there are reviews
    if (reviews.length > 0) {
      avgRating = (
        reviews
          .map((review) => parseFloat(review.rating))
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) / reviews.length
      ).toFixed(1);
      setAverageRating(avgRating);
    }

    // Construct form data to be submitted
    const videoGameFormData = {
      title,
      genre,
      developers,
      platforms,
      gameModes,
      releaseYear: parseInt(releaseYear),
      averageRating: avgRating,
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
            {platformsArr.map((platform) => (
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
            {gameModesArr.map((gameMode) => (
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
