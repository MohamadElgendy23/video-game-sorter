import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center w-full min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600 opacity-10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full bg-purple-600 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-blue-600 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mt-7 drop-shadow-lg text-shadow">
          Game<span className="text-indigo-400">Sorter</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-white mt-6 max-w-3xl mx-auto">
          Easily browse, review, and organize your video game collection by genre, rating, and more.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/games")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg cursor-pointer transition-all hover-scale animate-glow"
          >
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
              </svg>
              Browse Games
            </span>
          </button>
          
          <button
            onClick={() => navigate("/games/new")}
            className="bg-transparent border-2 border-indigo-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg cursor-pointer transition-all hover:bg-indigo-900"
          >
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              Add New Game
            </span>
          </button>
        </div>
        
        <div className="mt-16 glass-effect py-6 px-8 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-indigo-400 mb-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
              <h3 className="text-white font-semibold">Organize</h3>
              <p className="text-gray-300 text-sm text-center">Sort and filter your games collection</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-indigo-400 mb-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <h3 className="text-white font-semibold">Rate & Review</h3>
              <p className="text-gray-300 text-sm text-center">Share your opinions on games</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-indigo-400 mb-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"></path>
              </svg>
              <h3 className="text-white font-semibold">Track</h3>
              <p className="text-gray-300 text-sm text-center">Keep track of your gaming collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
