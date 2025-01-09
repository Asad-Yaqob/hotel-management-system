import React from "react";
import { AlertCircle } from "lucide-react";
import { ReTryButton } from "./ReTryButton";

export function Error({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
      <p className="text-gray-800 font-medium mb-2">{message}</p>
      {onRetry && <ReTryButton onClick={ () => onRetry('/')} />}
    </div>
  );
}
