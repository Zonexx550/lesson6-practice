import React from "react";
import styles from "./TimerModal.module.css";

type Props = {
  seconds: number;
  onClose: () => void;
};

type State = {
  remaining: number;
  completed: boolean;
};

export class TimerModal extends React.Component<Props, State> {
  intervalId: number | undefined;

  state: State = {
    remaining: this.props.seconds,
    completed: false,
  };

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState((prev) => {
        if (prev.remaining <= 1) {
          clearInterval(this.intervalId);
          return { remaining: 0, completed: true };
        }
        return { remaining: prev.remaining - 1, completed: false };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { remaining, completed } = this.state;
    const { onClose } = this.props;

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h3>Обратный отсчёт</h3>
          <p className={completed ? styles.completed : styles.timer}>
            {completed ? "Счётчик завершён!" : remaining}
          </p>
          <button className={styles.button} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }
}
