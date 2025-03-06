import React from "react";

export const Progress = ({ value }) => {
  return (
    <div className="w-full">
      <span id="ProgressLabel" className="sr-only">Loading</span>

      <div
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={value}
        className="relative w-full rounded-full bg-gray-200 h-4"
      >
        <div
          className="h-4 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-center text-[10px]/4 transition-all duration-300"
          style={{ width: `${Math.min(value, 100)}%` }}
        >
          <p className="font-bold text-white">{value}%</p>
        </div>
      </div>
    </div>
  );
};
