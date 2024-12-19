import React from "react";
import { Mail, Lock } from "lucide-react";
import { Input } from "../../components/auth/Input";
import { Button } from "../../components/auth/Button";
import { LoginHeader } from "../../components/auth/LoginHeader";

function Login() {
  const onSubmit = () => {
    // Handle login logic here
    console.log("Form submitted:");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-gray-900 px-4">
      <div className="max-w-md w-full bg-white/10 p-6 rounded-lg shadow-lg">
        <LoginHeader />
        <form className="space-y-6 mt-6" onSubmit={onSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon={Mail}
            autoComplete="email"
            required
            placeholder="Enter your email"
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            icon={Lock}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span>Remember me</span>
            </label>

            <a
              href="#"
              className="text-purple-300 hover:text-purple-200 transition"
            >
              Forgot your password?
            </a>
          </div>

          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
