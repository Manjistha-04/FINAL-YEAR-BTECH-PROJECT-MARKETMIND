import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE } from "./lib/api";

import { StockTicker } from "./components/StockTicker";
import { HomePage } from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { TradePage } from "./pages/TradePage";
import { ChartPage } from "./pages/ChartPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminPage } from "./pages/AdminPage";
import { AdminRoute } from "./components/AdminRoute";

function App() {

  useEffect(() => {
    fetch(`${API_BASE}/test`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend Response:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      {/* Global Stock Ticker */}
      <StockTicker />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Pages */}
        <Route
          path="/trade"
          element={
            <ProtectedRoute>
              <TradePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin"
          element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
          }
        />

        <Route
          path="/chart/:symbol"
          element={
            <ProtectedRoute>
              <ChartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;