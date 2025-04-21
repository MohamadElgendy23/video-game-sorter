import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-screen">
      <h1 className="text-7xl font-bold text-white mt-7 drop-shadow-lg">
        Video Game Sorter
      </h1>
      <p className="text-3xl text-white mt-4">
        Easily browse, review, and organize games by genre, rating, and more.
      </p>
      <button
        onClick={() => navigate("/games")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 mt-7 rounded-2xl shadow-lg text-lg transition-all"
      >
        View All Games
      </button>
    </div>
  );
}

export default Home;
