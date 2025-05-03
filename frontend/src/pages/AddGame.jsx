import React, { useState, useEffect } from "react";
import { getVideoGames, addVideoGame, deleteAllVideoGames } from "../api/videoGameAPI.js";
import {
  platforms as platformsArr,
  gameModes as gameModesArr,
} from "../data/data.js";

// Get any existing data from localStorage
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
  const [existingGames, setExistingGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
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

  // get existing games
  useEffect(() => {
    const fetchGames = async () => {
      const videoGames = await getVideoGames();
      console.log(videoGames);
      setExistingGames(videoGames);
    };
    fetchGames();
  }, []);

  // save to local storage when fields change
  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(title));

    if (!Array.isArray(existingGames)) {
      setFilteredGames([]);
      return;
    }

    // filter games by title
    if (title.trim() === "") {
      setFilteredGames(existingGames);
    } else {
      const filtered = existingGames.filter(
        (videoGame) =>
          videoGame &&
          videoGame.title &&
          videoGame.title.toLowerCase().startsWith(title.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [existingGames, title]);
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

  function handleGameClick(game) {
    setTitle(game.title);
    setImage(game.image);
    setGenre(game.genre);
    setDevelopers(game.developers);
    setPlatforms(game.platforms);
    setGameModes(game.gameModes);
    setReleaseYear(game.releaseYear);
    setAverageRating(game.averageRating);
    setReviews(game.reviews);
    setNewReview({
      reviewerName: "",
      rating: "1",
      comment: "",
    });
  }

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
  }

  function handleNewReviewChange(event) {
    const { name, value } = event.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // function that calculates average rating of reviews on the fly (if there contains reviews)
  function calculateAverageRating(currReviews) {
    let avgRating = 0;
    if (currReviews.length > 0) {
      avgRating = (
        currReviews
          .map((review) => parseFloat(review.rating))
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0) / currReviews.length
      ).toFixed(1);
    }
    return avgRating;
  }

  // called when the form is submitted (with all required fields)
  async function handleSubmit(event) {
    event.preventDefault();

    // handle adding the new review
    if (!newReview.reviewerName || !newReview.rating || !newReview.comment) {
      return;
    }
    const currReviews = [...reviews, newReview];
    setReviews(currReviews);

    const avgRating = calculateAverageRating(currReviews);
    setAverageRating(avgRating);

    // Construct form data to be submitted
    const videoGameFormData = {
      title,
      genre,
      developers,
      platforms,
      gameModes,
      releaseYear: parseInt(releaseYear),
      averageRating: avgRating,
      reviews: currReviews,
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
  
  // function to delete all games from the database
  async function handleDeleteAllGames() {
    if (window.confirm("Are you sure you want to delete ALL games? This action cannot be undone.")) {
      setLoading(true);
      const result = await deleteAllVideoGames();
      alert(result);
      setLoading(false);
      // Refresh the games list
      const videoGames = await getVideoGames();
      setExistingGames(videoGames || []);
      setFilteredGames(videoGames || []);
    }
  }

  return (
    <section className="py-10 px-6 flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-indigo-900 min-h-screen">
      <h2 className="text-5xl text-white font-bold text-center mb-10 drop-shadow-lg">
        Add New Video Game
      </h2>
      <form
        className="p-8 space-y-6 bg-white shadow-xl w-full max-w-2xl rounded-lg border border-indigo-100"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <label
            htmlFor="title"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Game Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              className="block w-full p-4 pl-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search or enter game title..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center max-h-60 overflow-y-auto">
            {Array.isArray(filteredGames) && filteredGames.length > 0
              ? filteredGames.map((filteredGame) => (
                  <div
                    key={filteredGame.id}
                    className="p-3 border border-indigo-200 hover:bg-indigo-50 rounded-lg cursor-pointer bg-white w-full text-center my-1 transition-colors duration-200 shadow-sm"
                    onClick={() => handleGameClick(filteredGame)}
                  >
                    {filteredGame.title}
                  </div>
                ))
              : []}
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Image (URL)
          </label>
          <div className="relative">
            <input
              type="text"
              id="image"
              name="image"
              className="block w-full p-4 pl-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          {image && (
            <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-indigo-100 shadow-inner">
              <img
                src={image}
                alt="Game preview"
                className="max-h-60 mx-auto rounded-md object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML +=
                    '<div class="p-4 text-center text-red-500">Image could not be loaded</div>';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Genre
          </label>
          <div className="relative">
            <select
              id="genre"
              name="genre"
              className="block w-full p-4 pl-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="developers"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Developers
          </label>
          <div className="relative">
            <input
              type="text"
              id="developers"
              name="developers"
              className="block w-full p-4 pl-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
              placeholder="Enter developer names, separated by commas"
              value={developers}
              onChange={(e) => handleDevelopersChange(e)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </div>
          </div>
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
              step="0.01"
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
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm border border-gray-300 cursor-pointer"
              onClick={clearFormFields}
            >
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Cancel
              </span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="flex items-center justify-center">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Save Game
                  </>
                )}
              </span>
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleDeleteAllGames}
            disabled={loading}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              Delete All Games
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddGame;
