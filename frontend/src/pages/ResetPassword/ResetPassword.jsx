import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../../services/auth";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(token, newPassword);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Couldn't reset password. The link may have expired.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="glass w-full max-w-[420px] p-10">
        <h1 className="text-2xl font-semibold mb-6 text-center">Reset password</h1>

        {error && <p className="pill pill-flagged mb-4 w-full text-center py-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Reset token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="field"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="field"
            required
          />
          <button type="submit" className="btn-primary w-full">Reset password</button>
        </form>

        <p className="text-ink-secondary mt-6 text-center text-sm">
          <Link to="/login" className="text-ocean-600 font-medium">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
