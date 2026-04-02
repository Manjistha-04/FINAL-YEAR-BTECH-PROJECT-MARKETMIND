# 🚀 MarketMind – AI-Powered Stock Analysis & Trading Simulation Platform

MarketMind is a full-stack AI-driven stock market analysis system that leverages Natural Language Processing (NLP) and Machine Learning to analyze global financial news, predict market sentiment, and simulate trading decisions.

It transforms unstructured news data into actionable insights, helping users understand market trends and make informed decisions.

---

## 📌 Features

* 🧠 **AI-Based Sentiment Analysis**

  * Analyze financial news using NLP
  * Classify sentiment (Positive / Negative / Neutral)

* 📊 **Stock Trend Prediction**

  * Predict potential stock movement based on news sentiment

* ⚡ **Real-Time Data Pipeline**

  * Automated ETL pipeline for collecting and processing news data

* 💹 **Trading Simulation**

  * Virtual buy/sell system based on AI insights

* 📈 **Market Sentiment Dashboard**

  * Visual representation of overall market mood

* 🔐 **Authentication System**

  * Secure login/signup for users

---

## 🏗️ Tech Stack

### 💻 Frontend

* React.js
* TypeScript
* Tailwind CSS
* Vite

### ⚙️ Backend

* Node.js
* Express.js

### 🧠 AI / ML

* Python
* NLP (Sentiment Analysis)
* Pandas, Scikit-learn

### 🗄️ Database

* MongoDB

### 🔄 Data Engineering

* ETL Pipelines
* Data Cleaning & Transformation

---

## 📂 Project Structure

```
FINAL-YEAR-BTECH-PROJECT-MARKETMIND/
│
├── marketmind-frontend/   # React frontend
├── marketmind-backend/    # Node.js backend
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Manjistha-04/FINAL-YEAR-BTECH-PROJECT-MARKETMIND.git
cd FINAL-YEAR-BTECH-PROJECT-MARKETMIND
```

---

### 2️⃣ Setup Backend

```bash
cd marketmind-backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd marketmind-frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside `marketmind-backend/` and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Future Enhancements

* 📡 Live news streaming during market hours
* 🤖 Advanced deep learning models for prediction
* 📊 Portfolio tracking system
* 🌐 Cloud deployment (AWS / GCP)
* 📉 Real-time stock API integration

---

## 👨‍💻 Team Collaboration

* Always pull before pushing:

```bash
git pull origin main
```

* After making changes:

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## ⚠️ Important Notes

* ❌ Do not push `.env`
* ❌ Do not push `node_modules`
* ✅ Follow proper Git workflow

---

## 📜 License

This project is developed as a Final Year B.Tech Project.

---

## 💡 Tagline

**Turning financial news into actionable market intelligence using AI.**
