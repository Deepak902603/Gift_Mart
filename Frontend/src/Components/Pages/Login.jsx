import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isSignup ? "/api/users/register" : "/api/users/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      // Optionally store user/token here
      // localStorage.setItem("user", JSON.stringify(data));

      setMessage(data.message);

      // Redirect to home page after success
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:outline-yellow-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-yellow-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-yellow-500"
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:outline-yellow-500"
            />
          )}

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-yellow-600 font-semibold hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-yellow-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
