import React from "react";
import { Hotel } from "lucide-react";

export function LoginHeader() {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <div className="p-3 bg-purple-600/20 rounded-full ring-2 ring-purple-500">
          <Hotel className="w-12 h-12 text-purple-300" />
        </div>
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
        LuxuryStay Hospitality
      </h2>
      <p className="mt-2 text-sm text-gray-300">
        Sign in to access your dashboard
      </p>
    </div>
  );
}
