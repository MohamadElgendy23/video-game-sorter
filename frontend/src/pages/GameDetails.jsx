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
      <h2 className="text-5xl font-bold text-white text-center mb-7"></h2>
    </section>
  );
}

export default GameDetail;
