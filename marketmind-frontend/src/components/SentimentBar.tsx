import "./SentimentBar.css";

type SentimentType = "positive" | "neutral" | "negative";

interface SentimentItem {
  label: string;
  value: string;
  type: SentimentType;
}

const sentiments: SentimentItem[] = [
  { label: "Market", value: "Bullish", type: "positive" },
  { label: "IT", value: "Positive", type: "positive" },
  { label: "Banking", value: "Neutral", type: "neutral" },
  { label: "Energy", value: "Bearish", type: "negative" },
];

export function SentimentBar() {
  return (
    <div className="sentiment-pills">
      {sentiments.map((item, index) => (
        <div key={index} className={`pill ${item.type}`}>
          <span className="pill-label">{item.label}</span>
          <span className="pill-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
