import "./Timer.css";
import { useState, useEffect } from "react";

export default function Timer() {
  // count は「残り秒数」を保持する（表示するときだけ分:秒に分解する）
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;
  const formattedCount = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const startTimer = () => {
    if (count > 0) {
      setActive(true);
    }
  };

  const stopTimer = () => {
    setActive(false);
  };

  // タイマーのカウントダウン処理を行う
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (active) {
      interval = setInterval(() => {
        // 0未満にならないようにクランプする
        setCount((prevCount) => Math.max(0, prevCount - 1));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active]);

  // 0秒になったらタイマーを止める
  useEffect(() => {
    if (count === 0) {
      setActive(false);
    }
  }, [count]);

  return (
    <div>
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
      <div className="timer">{formattedCount}</div>
      <input
        disabled={active}
        type="number"
        value={minutes}
        onChange={(e) =>
          setCount(Number(Math.max(0, Number(e.target.value))) * 60 + seconds)
        }
      />
      <label>分</label>
      <input
        disabled={active}
        type="number"
        value={seconds}
        onChange={(e) =>
          setCount(minutes * 60 + Number(Math.max(0, Number(e.target.value))))
        }
      />
      <label>秒</label>
    </div>
  );
}
