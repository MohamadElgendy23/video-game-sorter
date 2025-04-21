import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { genres, platforms } from "../data/data.js";
import { getVideoGames, getVideoGame } from "../api/api.js";

function Games() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getVideoGames().then((videoGames) => {
      setGames(videoGames);
    });
  }, []);

  return (
    <section className="py-10 px-6">
      <h2 className="text-5xl font-bold text-white text-center mb-6">
        Browse Games by Category
      </h2>

      {/* Genres filter */}
      <div className="flex justify-center gap-4 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            className="bg-white border border-gray-300 text-lg px-4 py-2 rounded hover:bg-indigo-100 cursor-pointer"
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {games &&
          games?.map((game) => (
            <div key={game.id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{game.title}</h3>
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
                onClick={() => {
                  navigate(`/games/${game.id}`);
                }}
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Games;
