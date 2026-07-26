import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devToken, setDevToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await forgotPassword(email);
      setMessage(res.data.message);
      // DEV-ONLY: no email service exists yet, so the backend returns the
      // reset token directly for testing. Remove this once real email
      // delivery is wired up — a token should never reach the client this way.
      if (res.data.dev_reset_token) setDevToken(res.data.dev_reset_token);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="glass w-full max-w-[420px] p-10">
        <h1 className="text-2xl font-semibold mb-6 text-center">Forgot password</h1>

        {error && <p className="pill pill-flagged mb-4 w-full text-center py-2">{error}</p>}
        {message && <p className="pill pill-active mb-4 w-full text-center py-2">{message}</p>}

        {devToken && (
          <div className="mb-4 p-3 rounded-lg bg-clay-50 text-xs text-clay-600 break-all">
            <strong>Dev mode</strong> (no email service yet) — reset token:
            <br />{devToken}
            <br />
            <Link to={`/reset-password?token=${devToken}`} className="text-ocean-600 font-medium">
              Continue to reset →
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            required
          />
          <button type="submit" className="btn-primary w-full">Send reset link</button>
        </form>

        <p className="text-ink-secondary mt-6 text-center text-sm">
          <Link to="/login" className="text-ocean-600 font-medium">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
