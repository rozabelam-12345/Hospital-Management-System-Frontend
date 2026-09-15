import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTabs from "./AuthTabs";
import axios from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";

function SignIn({ activeTab, setActiveTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });

      const payload = response.data.data;
      const loggedInUser = payload.user;
      const token = payload.token;
      login(loggedInUser, token);

      navigate("/");
    } catch (error) {
      console.log("Full error object:", error);
      setMessage(
        error.response?.data?.message || "Login failed. Check your console.",
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col justify-center h-full align-middle">
        <div className="w-full flex justify-center">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex flex-col px-8">
          <div className="mt-5">
            <p className="font-semibold text-xl">Welcome back</p>
            <p className="text-gray-700 text-sm">
              Sign in to access your patient portal.
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-col">
              <label className="text-sm text-blue-900">Email address</label>
              <input
                className="border border-gray-300 rounded-xl px-6 py-2 bg-white text-sm text-black"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="text-sm text-blue-900">Password</label>
              <input
                className="border border-gray-300 rounded-xl px-6 py-2 bg-white text-sm text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-sm border-gray-300 accent-blue-900"
              />
              <label className="text-sm text-gray-700 select-none">
                Remember me
              </label>
            </div>
            <div className="text-sm text-blue-900 font-semibold">
              <p>Forgot password?</p>
            </div>
          </div>
          <div className="flex justify-center mt-3 bg-blue-900 p-2 rounded-sm text-white">
            <button type="button" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
