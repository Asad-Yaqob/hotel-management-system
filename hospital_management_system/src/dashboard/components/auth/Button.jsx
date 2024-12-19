import React from "react";

export function Button({
  children,
  fullWidth = false,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "flex justify-center py-2.5 px-4 border border-transparent rounded-lg " +
    "shadow-sm text-sm font-medium transition duration-150 ease-in-out " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    secondary:
      "text-purple-700 bg-white hover:bg-purple-50 focus:ring-purple-500",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
