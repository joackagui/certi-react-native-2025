import { useEffect, useMemo, useState } from 'react';

import styles from './SessionNotes.module.css';

type SessionNotesProps = {
  storageKey?: string;
};

export function SessionNotes({ storageKey = 'session-notes' }: SessionNotesProps) {
  const [notes, setNotes] = useState<string>(storageKey);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLastSaved(new Date());
      setIsDirty(false);
    }, 400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDirty, notes]);

  const helperText = useMemo(() => {
    if (isDirty) {
      return 'Guardando…';
    }

    if (lastSaved) {
      return `Guardado a las ${lastSaved.toLocaleTimeString()}`;
    }

    return 'Tus notas se guardan automáticamente en este navegador.';
  }, [isDirty, lastSaved]);

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h3>Notas rápidas</h3>
        <span>{helperText}</span>
      </header>
      <textarea
        value={notes}
        onChange={event => {
          setNotes(event.target.value);
          setIsDirty(true);
        }}
        placeholder="Escribe aprendizajes, blockers o acuerdos de la sesión…"
      />
    </section>
  );
}
