import React from "react";
import { categories, platforms } from "../data/data.js";
import {}

function Games() {
  return (
    <section className="py-10 px-6 bg-gray-100">
      <h2 className="text-5xl font-bold text-white text-center mb-6">
        Browse Games by Category
      </h2>

      {/* Categories filter */}
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className="bg-white border border-gray-300 text-lg px-4 py-2 rounded hover:bg-indigo-100"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {}
      </div>
    </section>
  );
}

export default Games;
