import { useNavigate } from "react-router-dom";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import bgVideo from "../assets/Simple_Attractive_Video_Design.mp4";
import "./AuthSplit.css";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = () => {
    setError("");
    setSuccess("Account created successfully!");
  };

  return (
    <div className="auth-split-page">
      {/* 🔥 BACKGROUND VIDEO */}
      <video className="auth-bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* 🔥 SIGNUP CARD */}
      <div className="auth-split-card signup-mode">
        {/* 🔙 BACK BUTTON */}
        <button
          className="auth-back-btn inside-card"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        {/* GREEN PANEL */}
        <div className="welcome-panel">
          <h2>WELCOME!</h2>
        </div>

        {/* FORM PANEL */}
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
              <input type="text" placeholder="Username" required />
              <span className="input-icon">
                <User size={14} />
              </span>
            </div>

            <div className="input-group">
              <input type="email" placeholder="Email" required />
              <span className="input-icon">
                <Mail size={14} />
              </span>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
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
