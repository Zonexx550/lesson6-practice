import React, { useState } from "react";
import styles from "./TimerStarter.module.css";
import { TimerModal } from "./TimerModal";

export const TimerStarter = () => {
  const [inputValue, setInputValue] = useState("");
  const [seconds, setSeconds] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const parsed = Number(trimmed);
    if (parsed > 0) {
      setSeconds(parsed);
      setInputValue("");
    }
  };

  const handleClose = () => {
    setSeconds(null);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Счётчик</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Введите секунды"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Начать
        </button>
      </form>

      {seconds !== null && (
        <TimerModal seconds={seconds} onClose={handleClose} />
      )}
    </div>
  );
};
 
