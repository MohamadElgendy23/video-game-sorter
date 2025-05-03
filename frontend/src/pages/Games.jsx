import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { genres, platforms, gameModes } from "../data/data.js";
import { getVideoGames } from "../api/videoGameAPI.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";

function Games() {
  const [loading, setLoading] = useState(true);
  const [allGames, setAllGames] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [activePlatform, setActivePlatform] = useState(["All"]);
  const [activeGameMode, setActiveGameMode] = useState(["Single-player"]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getVideoGames()
      .then((videoGames) => {
        // Ensure videoGames is an array before setting state
        setAllGames(Array.isArray(videoGames) ? videoGames : []);
      })
      .catch((error) => {
        console.error("Error fetching video games:", error);
        setAllGames([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // games is now computed on the fly based on allGames, debouncedQuery, activeGenre, activePlatform, and activeGameMode
  const games = useMemo(() => {
    // Ensure allGames is an array before filtering
    if (!Array.isArray(allGames)) {
      return [];
    }

    return allGames.filter((videoGame) => {
      // Safety check for videoGame object
      if (!videoGame) return false;

      const matchesQuery =
        debouncedQuery === "" ||
        (videoGame.title &&
          videoGame.title
            .toLowerCase()
            .startsWith(debouncedQuery.toLowerCase()));

      const matchesGenres =
        activeGenre === "All" || activeGenre === videoGame.genre;

      const matchesPlatforms =
        activePlatform[0] === "All" ||
        (Array.isArray(videoGame.platforms) &&
          activePlatform.some((platform) =>
            videoGame.platforms.includes(platform)
          ));

      const matchesGameModes =
        activeGameMode[0] === "Single-player" ||
        (Array.isArray(videoGame.gameModes) &&
          activeGameMode.some((gameMode) =>
            videoGame.gameModes.includes(gameMode)
          ));

      return (
        matchesQuery && matchesGenres && matchesPlatforms && matchesGameModes
      );
    });
  }, [allGames, debouncedQuery, activeGenre, activePlatform, activeGameMode]);

  return (
    <section className="flex flex-col items-center py-10 px-6 bg-gradient-to-b from-gray-900 to-indigo-900 min-h-screen">
      <h2 className="text-5xl font-bold text-white text-center mb-7 drop-shadow-lg">
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
            key={genre}
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activeGenre.includes(genre) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {genre}
            <input
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
            key={gameMode}
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activeGameMode.includes(gameMode) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {gameMode}
            <input
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
            key={platform}
            className={`border border-gray-300 text-lg px-4 py-2 rounded cursor-pointer ${activePlatform.includes(platform) ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-black hover:bg-indigo-100"}`}
          >
            {platform}
            <input
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
      ) : Array.isArray(games) && games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-7xl">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
              onClick={(e) => {
                // Prevent navigation if clicking on the button
                if (e.target.tagName !== 'BUTTON') {
                  navigate(`/games/${game.id}/details`);
                }
              }}
            >
              {/* Game Image with Fallback */}
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                {game.image ? (
                  <img 
                    className="w-full h-full object-cover" 
                    src={game.image} 
                    alt={`${game.title} cover`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                
                {/* Rating Badge */}
                {game.averageRating > 0 && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                    {game.averageRating}
                  </div>
                )}
              </div>
              
              {/* Game Info */}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{game.title}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                    {game.genre}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                    {game.releaseYear}
                  </span>
                </div>
                
                {/* Developers */}
                {game.developers && game.developers.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Developers</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {game.developers.join(", ")}
                    </p>
                  </div>
                )}
                
                {/* Platforms */}
                {game.platforms && game.platforms.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Platforms</p>
                    <div className="flex flex-wrap gap-1">
                      {game.platforms.map((platform) => (
                        <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Game Modes - Collapsed */}
                {game.gameModes && game.gameModes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Game Modes</p>
                    <div className="flex flex-wrap gap-1">
                      {game.gameModes.slice(0, 3).map((mode) => (
                        <span key={mode} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {mode}
                        </span>
                      ))}
                      {game.gameModes.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{game.gameModes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Reviews Summary */}
                {game.reviews && game.reviews.length > 0 && (
                  <div className="mt-auto">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Reviews</p>
                    <p className="text-sm text-gray-600">
                      {game.reviews.length} {game.reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Action Button */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                <button
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/games/${game.id}/details`);
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View Details
                </button>
              </div>
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
