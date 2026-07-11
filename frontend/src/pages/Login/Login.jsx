import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/auth";
import { getMyProfile } from "../../services/profile";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login
      const res = await loginUser(formData);

      // Save JWT
      localStorage.setItem("token", res.data.access_token);

      alert("Login Successful");

      // Check whether profile exists
      try {
        await getMyProfile();

        // Existing user
        navigate("/profile");

      } catch (err) {

        if (err.response?.status === 404) {
          // New user
          navigate("/create-profile");
        } else {
          alert("Unable to verify profile");
        }

      }

    } catch (err) {
      alert(err.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-slate-900 p-10 rounded-2xl w-[420px]">

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;