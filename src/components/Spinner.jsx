// src/components/Spinner.jsx

import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="w-12 h-12 border-4 border-sky-500 border-solid border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default Spinner;