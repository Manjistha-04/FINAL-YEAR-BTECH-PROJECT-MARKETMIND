import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { StockTicker } from "./components/StockTicker";
import { HomePage } from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { TradePage } from "./pages/TradePage";
import { ChartPage } from "./pages/ChartPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
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