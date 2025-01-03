import React from "react";

export function ReTryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
    >
      Try Again
    </button>
  );
}
