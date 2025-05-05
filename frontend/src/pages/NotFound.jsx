import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center gap-6 min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 px-4">
      <h1 className="text-white text-6xl font-bold drop-shadow-lg">404 - Not Found</h1>
      <p className="text-white text-2xl max-w-2xl">
        The page you are looking for does not exist or has been moved.
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md cursor-pointer flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          Go Home
        </button>
        
        <button
          onClick={() => navigate("/games")}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium shadow-md cursor-pointer flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
          </svg>
          Browse Games
        </button>
      </div>
      
      <div className="mt-12 text-gray-300 text-lg">
        <p>Lost? Don't worry, we've all been there.</p>
      </div>
    </div>
  );
}

export default NotFound;
