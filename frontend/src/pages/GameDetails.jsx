import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getVideoGame } from "../api/api";

function GameDetail() {
  const [loading, setLoading] = useState(true);
  const [videoGame, setVideoGame] = useState({});
  const [searchParams] = useSearchParams();

  const videoGameId = searchParams.get("id");

  useEffect(() => {
    setLoading(true);
    getVideoGame(videoGameId)
      .then((videoGame) => setVideoGame(videoGame))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 px-6">
      {loading ? (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64">
          <div className="w-16 h-16 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        videoGame &&
        videoGame.length > 0 && (
          <div
            className={`flex flex-col items-center justify-center gap-3 bg-[url(${videoGame.image})] bg-cover w-full h-screen`}
          >
            <h3 className="text-xl font-semibold">{videoGame.title}</h3>
            <p className="text-sm text-gray-600">{videoGame.genre}</p>
            <p className="text-sm text-gray-600">{videoGame.releaseYear}</p>
            <p className="text-sm text-gray-600">{videoGame.averageRating}</p>
            <div>
              {videoGame.developers.map((developer) => (
                <p key={developer} className="text-sm text-gray-600">
                  {developer}
                </p>
              ))}
            </div>
            <div>
              {videoGame.platforms.map((platform) => (
                <p key={platform} className="text-sm text-gray-600">
                  {platform}
                </p>
              ))}
            </div>
            <div>
              {videoGame.gameModes.map((gameMode) => (
                <p key={gameMode} className="text-sm text-gray-600">
                  {gameMode}
                </p>
              ))}
            </div>
            <div>
              {videoGame.reviews.map((review, index) => (
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
          </div>
        )
      )}
    </section>
  );
}

export default GameDetail;
