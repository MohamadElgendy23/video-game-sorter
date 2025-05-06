import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  // Auto-redirect after countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col justify-center items-center text-center gap-6 min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-600 opacity-10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full bg-orange-600 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-yellow-600 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 animate-fadeIn">
        <div className="text-9xl font-bold text-white opacity-10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">404</div>
        <h1 className="text-white text-6xl font-bold drop-shadow-lg relative">
          404 - Not Found
        </h1>
        <div className="w-24 h-1 bg-indigo-500 mx-auto my-6"></div>
        <p className="text-white text-2xl max-w-2xl">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <div className="mt-12 glass-effect py-4 px-6 rounded-xl inline-block">
          <p className="text-white">
            Redirecting to home in <span className="text-indigo-300 font-bold">{countdown}</span> seconds...
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md cursor-pointer flex items-center justify-center hover-scale"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Go Home
          </button>
          
          <button
            onClick={() => navigate("/games")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium shadow-md cursor-pointer flex items-center justify-center hover-scale"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
            </svg>
            Browse Games
          </button>
        </div>
        
        <div className="mt-12 text-gray-300 text-lg">
          <p>Lost? Don't worry, we've all been there.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button 
              onClick={() => navigate(-1)} 
              className="text-indigo-300 hover:text-indigo-100 transition-colors"
            >
              ← Go Back
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="text-indigo-300 hover:text-indigo-100 transition-colors"
            >
              ↻ Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
