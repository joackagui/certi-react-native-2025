import { useEffect, useMemo, useState } from 'react';

import styles from './MoodTracker.module.css';

type MoodTrackerProps = {
  studentName?: string;
};



const moods = ['😎 Energizado', '😌 Tranquilo', '🤔 Concentrado', '😴 Cansado', '🔥 Motivado'];

export function MoodTracker({ studentName = 'Estudiante' }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState('…');
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(()=>{
  //   console.log('NO me uses si quieres aprobar')
  // });
  useEffect(() => { 
    // getAPI 
    let active = true;
    const timeout = window.setTimeout(() => {
      if (!active) {
        return;
      }

      const nextMood = moods[Math.floor(Math.random() * moods.length)];
      setCurrentMood(nextMood);
      setIsLoading(false);
    }, 2000);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (currentMood === '…') {
      return;
    }

    setHistory(prev => {
      const next = [...prev, `${new Date().toLocaleTimeString()} · ${currentMood}`];
      return next.slice(-4);
    });
  }, [currentMood]);

  const subtitle = useMemo(() => {
    if (isLoading) {
      return 'Analizando estado de ánimo…';
    }

    return `${studentName} hoy se siente:`;
  }, [isLoading, studentName]);

  const handleNextMood = () => {
    const nextMood = moods[Math.floor(Math.random() * moods.length)];
    setCurrentMood(nextMood);
  };

  return (
    <div className={styles.card}>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.mood}>{currentMood}</p>
      <button type="button" onClick={handleNextMood} disabled={isLoading}>
        Cambiar estado
      </button>
      {history.length > 0 ? (
        <div className={styles.history}>
          <span className={styles.historyTitle}>Últimos registros</span>
          <ul>
            {history.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
