import React, { useState } from "react";
import { addVideoGame } from "../api/api.js";

function AddGame() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [developers, setDevelopers] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [gameModes, setGameModes] = useState("");
  const [releaseYear, setReleaseYear] = useState("2016");
  const [averageRating, setAverageRating] = useState("1");
  const [reviews, setReviews] = useState("");

  function handleCancel() {
    setTitle("");
    setGenre("");
    setDevelopers("");
    setPlatforms("");
    setGameModes("");
    setReleaseYear("");
    setAverageRating("");
    setReviews("");
  }

  return (
    <section className="py-10 px-6 flex justify-center items-center flex-col">
      <h2 className="text-5xl text-white font-semibold text-center mb-10">
        Add New Video Game
      </h2>
      <form className="p-4 space-y-4 bg-[#f2f2f2] shadow-md w-1/3 rounded-md">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-extrabold text-gray-700"
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
            htmlFor="genre"
            className="block text-sm font-extrabold text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
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
            className="block text-sm font-extrabold text-gray-700"
          >
            Developers
          </label>
          <input
            type="text"
            id="developers"
            name="developers"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter developer names, separated by commas"
            value={developers}
            onChange={(e) => setDevelopers(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="platforms"
            className="block text-sm font-extrabold text-gray-700"
          >
            Platforms
          </label>
          <select
            id="platforms"
            name="platforms"
            multiple
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            value={platforms}
            onChange={(e) => setPlatforms(e.target.value)}
          >
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Browser">Browser</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="gameModes"
            className="block text-sm font-extrabold text-gray-700"
          >
            Game Modes
          </label>
          <select
            id="gameModes"
            name="gameModes"
            multiple
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            value={gameModes}
            onChange={(e) => setGameModes(e.target.value)}
          >
            <option value="Single-player">Single-player</option>
            <option value="Multiplayer">Multiplayer</option>
            <option value="Co-op">Co-op</option>
            <option value="Versus (PvP)">Versus (PvP)</option>
            <option value="Campaign">Campaign</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Battle Royale">Battle Royale</option>
            <option value="Split-screen">Split-screen</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="releaseYear"
            className="block text-sm font-extrabold text-gray-700"
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
            className="block text-sm font-extrabold text-gray-700"
          >
            Average Rating (out of 5)
          </label>
          <input
            type="number"
            id="averageRating"
            name="averageRating"
            min="1"
            max="5"
            step="0.1"
            value={averageRating}
            onChange={(e) => setAverageRating(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="reviews"
            className="block text-sm font-extrabold text-gray-700"
          >
            Reviews
          </label>
          <textarea
            id="reviews"
            name="reviews"
            rows="4"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Write your review here"
            required
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Save Game
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddGame;
