import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleAuth = async () => {

    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const response = await API.post(endpoint, formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(isSignup ? "Signup Successful" : "Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(isSignup ? "Signup Failed" : "Invalid Credentials");

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-black text-white tracking-wide mb-3">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-gray-300 text-lg">
            {isSignup
              ? "Create your account to start managing projects"
              : "Login to continue managing your team"}
          </p>

        </div>

        <div className="space-y-5">

          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400 outline-none p-4 rounded-2xl transition"
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400 outline-none p-4 rounded-2xl transition"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400 outline-none p-4 rounded-2xl transition"
            onChange={handleChange}
          />

          <button
            onClick={handleAuth}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-lg p-4 rounded-2xl transition duration-300 shadow-lg shadow-cyan-500/30"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p
            onClick={() => setIsSignup(!isSignup)}
            className="text-center text-cyan-300 cursor-pointer hover:text-cyan-200 transition"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>

        </div>

        <div className="mt-8 text-center space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">

            <p className="text-cyan-300 font-bold mb-2 text-center">
              Demo Credentials
            </p>

            <p className="text-gray-300 text-sm">
              Email: harshit@test.com
            </p>

            <p className="text-gray-300 text-sm mt-1">
              Password: 123456
            </p>

          </div>

          <p className="text-gray-400 text-sm">
            Team Task Manager Dashboard
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;