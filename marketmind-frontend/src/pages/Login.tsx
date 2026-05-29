import { useNavigate } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import bgVideo from "../assets/Simple_Attractive_Video_Design.mp4";
import "./AuthSplit.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        "https://marketmind-backend-1k2a.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Login flag
      localStorage.setItem("isLoggedIn", "true");

      setSuccess("Login successful!");

      setTimeout(() => {
        navigate("/trade");
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

      <div className="auth-split-card login-mode">
        <button
          className="auth-back-btn inside-card"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <div className="welcome-panel">
          <h2>
            WELCOME <br /> BACK!
          </h2>
        </div>

        <div className="form-panel">
          <h3>Login</h3>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="input-icon">
                <User size={14} />
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
              Login
            </button>
          </form>

          <div className="auth-switch">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
}