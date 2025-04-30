import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 h-full">
      <h1 className="text-white text-6xl">404 - Not Found</h1>
      <p className="text-white text-3xl">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
