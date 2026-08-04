import "./Timer.css";
import { useState, useEffect } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const formattedCount = count.toString().padStart(2, "0");
  const startTimer = () => {
    setActive(true);
  };

  const stopTimer = () => {
    setActive(false);
  };

  // タイマーのカウントダウン処理を行う
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (active) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active]);

  return (
    <div>
      <button className="increment" onClick={() => setCount(count + 1)}>
        +
      </button>
      <button
        className="reset"
        onClick={() => {
          setCount(0);
          setActive(false);
        }}
      >
        reset
      </button>
      <button className="start" onClick={startTimer}>
        start
      </button>
      <button className="stop" onClick={stopTimer}>
        stop
      </button>
      <div className="timer">00:{formattedCount}</div>
    </div>
  );
}
