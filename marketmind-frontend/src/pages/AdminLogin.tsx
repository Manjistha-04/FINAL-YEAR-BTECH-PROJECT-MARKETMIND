import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://marketmind-backend-1k2a.onrender.com/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleAdminLogin =
    async (e: any) => {
      e.preventDefault();

      try {
        const res = await fetch(
          `${API_BASE}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          alert(
            data.message ||
              "Login failed"
          );

          return;
        }

        /* ✅ ADMIN CHECK */
        if (
          data.user.role !==
          "admin"
        ) {
          alert(
            "Access denied. Not admin."
          );

          return;
        }

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate(
          "/admin-dashboard"
        );
      } catch (err) {
        console.error(err);

        alert(
          "Server error"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={
          handleAdminLogin
        }
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          style={{
            background:
              "#22c55e",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
}