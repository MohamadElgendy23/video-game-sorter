import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { genres, platforms, gameModes } from "../data/data.js";
import { getVideoGames } from "../api/videoGameAPI.js";

function Games() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [activeGenre, setActiveGenre] = useState(["All"]);
  const [activePlatform, setActivePlatform] = useState(["All"]);
  const [activeGameMode, setActiveGameMode] = useState(["Single-player"]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getVideoGames()
      .then((videoGames) => {
        setGames(videoGames);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    // filter video games by query
    let currVideoGames = [...games];
    currVideoGames = currVideoGames.filter((videoGame) =>
      videoGame.title.toLowerCase().startsWith(query)
    );
    setGames(currVideoGames);

    setLoading(false);
  }, [query]);

  return (
    <section className="flex flex-col items-center py-10 px-6">
      <h2 className="text-5xl font-bold text-white text-center mb-7">
        Browse Games by Category
      </h2>
      <div className="text-center mb-7">
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 cursor-pointer focus:outline-none transition duration-300"
          onClick={() => navigate("/games/new")}
        >
          Add A Game
        </button>
      </div>

      {/* Genres filter */}
      <div className="flex justify-center gap-4 mb-6">
        {genres.map((genre) => (
          <label
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activeGenre.includes(genre) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {genre}
            <input
              key={genre}
              type="checkbox"
              className="hidden"
              onClick={() => {
                setActiveGenre((prevActiveGenre) => {
                  let currActiveGenre = [...prevActiveGenre];
                  if (!currActiveGenre.includes(genre)) {
                    if (genre === "All") {
                      // Can't have "All" and other genres at the same time
                      return ["All"];
                    } else {
                      if (currActiveGenre.includes("All")) {
                        return currActiveGenre;
                      }
                      currActiveGenre = [...currActiveGenre, genre];
                    }
                  } else {
                    currActiveGenre = currActiveGenre.filter(
                      (item) => item !== genre
                    );
                  }

                  return currActiveGenre;
                });
              }}
            />
          </label>
        ))}
      </div>

      {/* Game Modes filter */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {gameModes.map((gameMode) => (
          <label
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activeGameMode.includes(gameMode) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {gameMode}
            <input
              key={gameMode}
              type="checkbox"
              className="hidden"
              onClick={() => {
                setActiveGameMode((activeGameMode) => {
                  let currActiveGameMode = [...activeGameMode];
                  if (currActiveGameMode.includes(gameMode)) {
                    currActiveGameMode = currActiveGameMode.filter(
                      (item) => item !== gameMode
                    );
                  } else {
                    currActiveGameMode = [...currActiveGameMode, gameMode];
                  }
                  return currActiveGameMode;
                });
              }}
            ></input>
          </label>
        ))}
      </div>

      {/* Platforms filter */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {platforms.map((platform) => (
          <label
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activePlatform.includes(platform) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {platform}
            <input
              key={platform}
              type="checkbox"
              className="hidden"
              onClick={() => {
                setActivePlatform((prevActivePlatform) => {
                  let currActivePlatform = [...prevActivePlatform];
                  if (!currActivePlatform.includes(platform)) {
                    if (platform === "All") {
                      // Can't have "All" and other platforms at the same time
                      return ["All"];
                    } else {
                      if (currActivePlatform.includes("All")) {
                        return currActivePlatform;
                      }
                      currActivePlatform = [...currActivePlatform, platform];
                    }
                  } else {
                    currActivePlatform = currActivePlatform.filter(
                      (item) => item !== platform
                    );
                  }

                  return currActivePlatform;
                });
              }}
            ></input>
          </label>
        ))}
      </div>

      {/* Games Search Bar */}
      <div className="flex justify-start w-full max-w-md mt-5 mb-5 bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
        <div className="absolute transform -translate-x-1/2 max-w-md">
          <div className="absolute inset-y-0 left-2 top-6 flex items-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </div>
        </div>
        <input
          type="text"
          id="search"
          name="search"
          className="text-black w-full p-3 ml-5 focus:outline-none"
          value={query}
          placeholder="Search games by title..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64">
          <div className="w-16 h-16 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : games && games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <img className="" src={game.image} alt="Video game image" />
              <p className="text-sm text-gray-600">{game.genre}</p>
              <p className="text-sm text-gray-600">{game.releaseYear}</p>
              <p className="text-sm text-gray-600">{game.averageRating}</p>
              <div className="mt-2">
                {game.developers.map((developer) => (
                  <p key={developer} className="text-sm text-gray-600">
                    {developer}
                  </p>
                ))}
              </div>
              <div className="mt-2">
                {game.platforms.map((platform) => (
                  <p key={platform} className="text-sm text-gray-600">
                    {platform}
                  </p>
                ))}
              </div>
              <div className="mt-2">
                {game.gameModes.map((gameMode) => (
                  <p key={gameMode} className="text-sm text-gray-600">
                    {gameMode}
                  </p>
                ))}
              </div>
              <div className="mt-2">
                {game.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                        {review.reviewerName}
                      </h4>
                      <span className="text-sm text-yellow-500">
                        ⭐ {review.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="mt-3 text-indigo-600 hover:underline"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-6xl mb-2">🎮🚫</div>
          <h2 className="text-4xl font-semibold">No games found</h2>
          <p className="mt-2 text-2xl">
            Try adding some games or adjust your filters.
          </p>
        </div>
      )}
    </section>
  );
}

export default Games;
