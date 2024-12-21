import React from "react";
import { Loader2 } from "lucide-react";

export function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
