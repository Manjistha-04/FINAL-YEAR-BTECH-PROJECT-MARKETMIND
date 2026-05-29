import { useNavigate } from "react-router-dom";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import bgVideo from "../assets/Simple_Attractive_Video_Design.mp4";
import "./AuthSplit.css";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        "https://marketmind-backend-1k2a.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-split-page">
      <video className="auth-bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="auth-split-card signup-mode">
        <button
          className="auth-back-btn inside-card"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <div className="welcome-panel">
          <h2>WELCOME!</h2>
        </div>

        <div className="form-panel">
          <h3>Register</h3>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <span className="input-icon">
                <User size={14} />
              </span>
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="input-icon">
                <Mail size={14} />
              </span>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="input-icon clickable"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </span>
            </div>

            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}