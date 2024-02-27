import React from 'react';
import { useState } from "react";


function MyComponent() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-xl font-bold mb-2">Button clicked!</p>
            <button
              onClick={handleCloseAlert}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Click me
      </button>
    </div>
  );
}
export default MyComponent;
