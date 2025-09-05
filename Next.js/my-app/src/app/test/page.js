"use client"; // This makes the component interactive

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 My First Interactive Next.js Page</h1>
      <p>Current count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Click me
      </button>
    </main>
  );
}

