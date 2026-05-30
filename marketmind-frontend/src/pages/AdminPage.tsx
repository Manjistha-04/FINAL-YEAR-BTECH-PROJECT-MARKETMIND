import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

export function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [allOrders, setAllOrders] =
    useState<any[]>([]);

  const getSavedNews = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/news`
      );

      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFreshNews = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/news/fetch`
    );

    const data = await res.json();

    console.log(data);

    getSavedNews();
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchUsers();
    getSavedNews();
    fetchTrades();
  
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/users`
      );

      const data = await res.json();

      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/news`
      );

      const data = await res.json();

      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrades = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/trades/all`
      );

      const data = await res.json();

      setAllOrders(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>Admin Dashboard</h1>
      <button
        onClick={fetchFreshNews}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Fetch Fresh News
      </button>

      {/* ANALYTICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div className="modern-card">
          <h2>Total Users</h2>

          <h1>{users.length}</h1>
        </div>

        <div className="modern-card">
          <h2>Total Trades</h2>

          <h1>{allOrders.length}</h1>
        </div>

        <div className="modern-card">
          <h2>Total News</h2>

          <h1>{news.length}</h1>
        </div>

        <div className="modern-card">
          <h2>Positive News</h2>

          <h1>
            {
              news.filter(
                (n) =>
                  n.sentiment ===
                  "positive"
              ).length
            }
          </h1>
        </div>

        <div className="modern-card">
          <h2>Negative News</h2>

          <h1>
            {
              news.filter(
                (n) =>
                  n.sentiment ===
                  "negative"
              ).length
            }
          </h1>
        </div>
      </div>

      {/* USERS */}
      <h2 style={{ marginTop: "50px" }}>
        Users
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="modern-card"
          >
            <h3>{user.username}</h3>

            <p>{user.email}</p>

            <p>
              Role:{" "}
              <b>{user.role}</b>
            </p>

            <p>
              Balance: ₹
              {user.virtualBalance}
            </p>
          </div>
        ))}
      </div>

      {/* TRADES */}
      <h2 style={{ marginTop: "50px" }}>
        Recent Trades
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {allOrders.length === 0 ? (
          <div className="modern-card">
            <p>No trades found</p>
          </div>
        ) : (
          allOrders
            .slice(0, 15)
            .map((order) => (
              <div
                key={order.id}
                className="modern-card"
              >
                <h3>
                  {order.type} —{" "}
                  {order.ticker}
                </h3>

                <p>
                  Quantity:{" "}
                  {order.quantity}
                </p>

                <p>
                  Price: ₹
                  {order.price}
                </p>

                <p>
                  Time: {order.time}
                </p>
              </div>
            ))
        )}
      </div>

      {/* NEWS */}
      <h2 style={{ marginTop: "50px" }}>
        Latest AI News
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {news
          .slice(0, 10)
          .map((item) => (
            <div
              key={item._id}
              className="modern-card"
            >
              <h3>{item.title}</h3>

              <p>
                Company:{" "}
                {item.company}
              </p>

              <p>
                Sentiment:{" "}
                {item.sentiment}
              </p>

              <p>
                Prediction:{" "}
                {item.prediction}
              </p>

              <p>
                Confidence:{" "}
                {item.confidence}%
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}