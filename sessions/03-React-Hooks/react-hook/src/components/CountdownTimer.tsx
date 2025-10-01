import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './CountdownTimer.module.css';

type CountdownTimerProps = {
  initialSeconds?: number;
  label?: string;
  onFinish?: () => void;
  autoRestart?: boolean;
};


const pad = (value: number) => value.toString().padStart (2,'0');

export function CountdownTimer({
  initialSeconds = 1500,
  label = 'pomodoro',
  onFinish,
  autoRestart = false,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      onFinish?.();
      if (autoRestart) {
        setSeconds(initialSeconds);
        setIsRunning(true);
      }
    }
  }, [seconds, isRunning, autoRestart, initialSeconds, onFinish]);

  const formatted = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${pad(minutes)}:${pad(remainder)}`;
  }, [seconds]);

  const progress = useMemo(() => {
    if (initialSeconds <= 0) {
      return 1;
    }

    return 1 - seconds / initialSeconds;
  }, [seconds, initialSeconds]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{label}</h3>
        <span className={styles.status}>{isRunning ? 'En curso' : 'En pausa'}</span>
      </div>
      <div className={styles.time}>{formatted}</div>
      <div className={styles.progressTrack}>
        <div className={styles.progress} style={{ transform: `scaleX(${Math.min(progress, 1)})` }} />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => setIsRunning(prev => !prev)}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button type="button" onClick={handleReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
