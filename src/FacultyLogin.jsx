import React, { useState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from "react-icons/hi";
import logo from "./assets/logovidyasetu.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacultyLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Faculty ID is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/faculty-login",
        { email, password, rememberMe }
      );

      if (res.data.success) {
        localStorage.setItem("facultyToken", res.data.token);
        alert("Welcome " + res.data.faculty.name);
        navigate("/faculty");
      } else {
        setError(res.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2fbfc]">
      <div className="bg-[#d6f3f7] rounded-2xl shadow-lg px-8 py-10 max-w-md w-full text-center">
        <div className="mb-7">
          <div className="flex justify-center items-center mb-3">
            <img
              src={logo}
              alt="Vidya Setu Logo"
              className="h-16 w-16 rounded-full shadow-md"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-[#2176c7] mb-2">
            Welcome to Vidyasetu
          </h1>
          <p className="text-base text-[#2176c7] font-medium mb-3">
            Empowering educators, simplifying management.
          </p>
          <div className="font-bold text-2xl text-[#2176c7] mb-4">
            Faculty Login
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#2176c7] font-semibold mb-1 text-left"
            >
              Enter Faculty Email ID
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Faculty Email ID"
              className="student-login-input w-full px-4 py-3 rounded-lg border-2 border-[#b2e4ee] text-base mb-2 focus:outline-none focus:border-[#2176c7]"
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#2176c7] font-semibold mb-1 text-left"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b2e4ee]">
                <HiOutlineLockClosed size={20} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-[#b2e4ee] text-base focus:outline-none focus:border-[#2176c7]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#2176c7] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={22} />
                ) : (
                  <HiOutlineEye size={22} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-[#2176c7] text-base">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="accent-[#137333] h-4 w-4 rounded"
              />
              Remember Me
            </label>
            <a
              href="#"
              className="text-[#2176c7] font-medium underline text-base"
            >
              Forgot Password?
            </a>
          </div>

          {error && (
            <div className="text-red-600 mb-3 font-medium text-base">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-[#137333] text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 hover:bg-[#0b5c25] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading && (
              <span className="mr-2">
                <svg
                  className="animate-spin"
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#fff"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    fill="#fff"
                    opacity="0.75"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              </span>
            )}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;