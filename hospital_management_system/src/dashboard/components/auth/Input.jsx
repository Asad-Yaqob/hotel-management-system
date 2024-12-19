import React from "react";

export function Input({
  label,
  icon: Icon,
  error,
  touched,
  className = "",
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-200"
      >
        {label}
      </label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-300" />
        </div>
        <input
          {...props}
          className={`
            block w-full pl-10 pr-3 py-2 border rounded-lg 
            bg-white/5 text-white placeholder-gray-400
            ${touched && error ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            ${className}
          `}
        />
        {touched && error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
