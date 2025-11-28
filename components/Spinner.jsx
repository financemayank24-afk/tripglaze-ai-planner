import React from "react";

export default function Spinner({ message = "Crafting your itinerary..." }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      justifyContent: "center", padding: 24
    }}>
      <svg width="48" height="48" viewBox="0 0 50 50">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2f6f7f" />
            <stop offset="100%" stopColor="#aacbd1" />
          </linearGradient>
        </defs>
        <circle cx="25" cy="25" r="20" stroke="url(#g)" strokeWidth="5" strokeLinecap="round" fill="none"
          strokeDasharray="90" strokeDashoffset="60">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite"/>
        </circle>
      </svg>

      <div style={{fontSize: 16, color: "#234", fontWeight: 600}}>
        {message}
        <div style={{fontSize:12, color:"#666"}}>This usually takes 5–12 seconds</div>
      </div>
    </div>
  );
}
