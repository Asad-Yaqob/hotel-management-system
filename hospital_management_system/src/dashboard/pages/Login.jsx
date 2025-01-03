import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { Input } from "../components/auth/Input";
import { Button } from "../components/auth/Button";
import { LoginHeader } from "../components/auth/LoginHeader";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";

function Login() {
  const { login, isAuthenticated } = useStaffAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);

    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted");
      try {
        const response = await login(values.email, values.password);
        // console.log(response);
        const { success } = response;
        if (success) {
          navigate("/admin");
        }
      } catch (error) {
        console.log("Something went wronge :", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center bg-gradient-to-br  h-screen from-purple-800 to-gray-900 px-4">
      <div className="max-w-md w-full  bg-white/10 p-6 rounded-lg shadow-lg">
        <LoginHeader />
        <form
          className="space-y-6 mt-6"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Input
            name="email"
            type="email"
            label="Email Address"
            icon={Mail}
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
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
