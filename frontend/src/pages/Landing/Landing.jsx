import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">

        <h1 className="text-2xl font-bold text-cyan-400">
          AI Skin Intelligence
        </h1>

        <div className="space-x-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
          >
            Register
          </Link>

        </div>
      </nav>

      {/* Hero Section */}

      <div className="flex flex-col justify-center items-center text-center mt-28">

        <h1 className="text-6xl font-bold leading-tight">
          AI Powered
          <br />
          <span className="text-cyan-400">
            Personalized Skincare
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">

          Analyze your skin profile, lifestyle, and habits to
          receive intelligent skincare recommendations powered
          by Artificial Intelligence.

        </p>

        <div className="mt-10 flex gap-5">

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 px-7 py-3 rounded-xl text-lg font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-cyan-500 px-7 py-3 rounded-xl hover:bg-cyan-500"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Landing;