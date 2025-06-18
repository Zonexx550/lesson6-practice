import React, { Component } from "react";
import type { FormEvent, ChangeEvent } from "react";
import styles from "./TimerStarter.module.css";
import { TimerModal } from "./TimerModal";

type State = {
  inputValue: string;
  seconds: number | null;
};

export class TimerStarter extends Component<{}, State> {
  state: State = {
    inputValue: "",
    seconds: null,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = this.state.inputValue.trim();
    if (!trimmed) return;

    const parsed = Number(trimmed);
    if (parsed > 0) {
      this.setState({ seconds: parsed, inputValue: "" });
    }
  };

  handleClose = () => {
    this.setState({ seconds: null });
  };

  render() {
    const { inputValue, seconds } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1>Счётчик</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            placeholder="Введите секунды"
            value={inputValue}
            onChange={this.handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Начать
          </button>
        </form>

        {seconds !== null && (
          <TimerModal seconds={seconds} onClose={this.handleClose} />
        )}
      </div>
    );
  }
}
