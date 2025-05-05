import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoGame, updateVideoGame } from "../api/videoGameAPI.js";
import {
  platforms as platformsArr,
  gameModes as gameModesArr,
} from "../data/data.js";

function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [gameModes, setGameModes] = useState([]);
  const [releaseYear, setReleaseYear] = useState("2016");
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  // Fetch the game data when component mounts
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const gameData = await getVideoGame(id);
        if (gameData) {
          setTitle(gameData.title || "");
          setImage(gameData.image || "");
          setGenre(gameData.genre || "");
          setDevelopers(gameData.developers || []);
          setPlatforms(gameData.platforms || []);
          setGameModes(gameData.gameModes || []);
          setReleaseYear(gameData.releaseYear?.toString() || "2016");
          setAverageRating(gameData.averageRating || 0);
          setReviews(gameData.reviews || []);
        } else {
          setError("Game not found");
        }
      } catch (err) {
        setError("Error loading game data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  function handleDevelopersChange(event) {
    const input = event.target.value;
    const developersArray = input
      .split(",")
      .map((developer) => developer.trim());
    setDevelopers(developersArray);
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
        currGameModes = currGameModes.filter((gameMode) => gameMode !== value);
      }
    }

    setGameModes(currGameModes);
  }

  // Function to handle review deletion
  function handleDeleteReview(reviewId) {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);

    // Recalculate average rating
    recalculateAverageRating(updatedReviews);
  }

  // Function to start editing a review
  function handleEditReview(review) {
    setEditingReview({ ...review });
  }

  // Function to save edited review
  function handleSaveReviewEdit() {
    if (!editingReview) return;
    
    const updatedReviews = reviews.map(review => 
      review.id === editingReview.id ? editingReview : review
    );
    
    setReviews(updatedReviews);
    recalculateAverageRating(updatedReviews);
    setEditingReview(null);
  }

  // Function to cancel editing a review
  function handleCancelReviewEdit() {
    setEditingReview(null);
  }

  // Function to handle changes in the editing review form
  function handleEditingReviewChange(e) {
    const { name, value } = e.target;
    setEditingReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  }

  // Function to recalculate average rating
  function recalculateAverageRating(reviewsList) {
    if (reviewsList.length > 0) {
      const sum = reviewsList.reduce(
        (acc, review) => acc + parseFloat(review.rating),
        0
      );
      setAverageRating((sum / reviewsList.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      const updatedGame = {
        title,
        image,
        genre,
        developers,
        platforms,
        gameModes,
        releaseYear: parseInt(releaseYear),
        averageRating,
        reviews,
      };

      await updateVideoGame(id, updatedGame);
      navigate(`/games/${id}/details`);
    } catch (err) {
      setError("Failed to update game");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
        <div className="w-16 h-16 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <button
          onClick={() => navigate("/games")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <section className="py-10 px-6 flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-indigo-900 min-h-screen">
      <h2 className="text-5xl text-white font-bold text-center mb-10 drop-shadow-lg">
        Edit Game: {title}
      </h2>

      <form
        className="p-8 space-y-6 bg-white shadow-xl w-full max-w-2xl rounded-lg border border-indigo-100"
        onSubmit={handleSubmit}
      >
        {/* Game Title */}
        <div>
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
            />
          </div>
        </div>

        {/* Image URL */}
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

        {/* Genre */}
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

        {/* Developers */}
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
              value={developers.join(", ")}
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
          {developers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {developers.map((developer, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {developer}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Platforms */}
        <div>
          <label
            htmlFor="platforms"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Platforms
          </label>

          <div className="mt-1 grid grid-cols-2 gap-2">
            <label key="All" className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="platforms"
                id="platforms-all"
                value="All"
                checked={platforms.length === platformsArr.length}
                onChange={(e) => handlePlatformsChange(e)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span>All</span>
            </label>
            {platformsArr.slice(1).map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="platforms"
                  id={`platform-${platform}`}
                  value={platform}
                  checked={platforms.includes(platform)}
                  onChange={(e) => handlePlatformsChange(e)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span>{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Game Modes */}
        <div>
          <label
            htmlFor="gameModes"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Game Modes
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <label key="All" className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="gameModes"
                id="gameModes-all"
                value="All"
                checked={gameModes.length === gameModesArr.length}
                onChange={(e) => handleGameModesChange(e)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span>All</span>
            </label>
            {gameModesArr.map((gameMode) => (
              <label key={gameMode} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="gameModes"
                  id={`gameMode-${gameMode}`}
                  value={gameMode}
                  checked={gameModes.includes(gameMode)}
                  onChange={(e) => handleGameModesChange(e)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span>{gameMode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Release Year */}
        <div>
          <label
            htmlFor="releaseYear"
            className="block text-sm font-bold text-indigo-700 mb-2"
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
            className="block w-full p-4 pl-4 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Average Rating (Read-only) */}
        <div>
          <label
            htmlFor="averageRating"
            className="block text-sm font-bold text-indigo-700 mb-2"
          >
            Average Rating (calculated)
          </label>
          <p
            id="averageRating"
            className="p-4 border border-gray-300 rounded-lg text-gray-800 bg-gray-50"
          >
            {averageRating === 0 ? "No reviews yet" : averageRating}
          </p>
        </div>

        {/* Reviews Section */}
        <div>
          <label className="block text-sm font-bold text-indigo-700 mb-2">
            Reviews
          </label>

          {reviews.length === 0 ? (
            <p className="text-gray-500 italic p-4 text-center border border-dashed border-gray-300 rounded-lg">
              No reviews yet
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto p-2">
              {reviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative"
                >
                  {editingReview && editingReview.id === review.id ? (
                    // Edit mode
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Reviewer Name
                        </label>
                        <input
                          type="text"
                          name="reviewerName"
                          value={editingReview.reviewerName}
                          onChange={handleEditingReviewChange}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <input
                          type="number"
                          name="rating"
                          min="1"
                          max="5"
                          step="0.1"
                          value={editingReview.rating}
                          onChange={handleEditingReviewChange}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Comment
                        </label>
                        <textarea
                          name="comment"
                          value={editingReview.comment}
                          onChange={handleEditingReviewChange}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          type="button"
                          onClick={handleCancelReviewEdit}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveReviewEdit}
                          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{review.reviewerName}</h4>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-2">
                            ★ {review.rating}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditReview(review)}
                              className="text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer"
                              aria-label="Edit review"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                              aria-label="Delete review"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4 pt-4">
          <button
            type="button"
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm border border-gray-300 cursor-pointer"
            onClick={() => navigate(`/games/${id}/details`)}
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
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Cancel
            </span>
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="flex items-center justify-center">
              {saving ? (
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
                  Save Changes
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditGame;