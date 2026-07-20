import "./Timer.css";
import React, { useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);
  const formattedCount = count.toString().padStart(2, "0");
  return (
    <div>
      <button className="increment" onClick={() => setCount(count + 1)}>
        +
      </button>
      <div className="timer">00:{formattedCount}</div>
    </div>
  );
}
