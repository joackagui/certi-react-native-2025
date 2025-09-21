import { useCallback } from 'react';

import './App.css';
import { CountdownTimer } from './components/CountdownTimer';
import { MoodTracker } from './components/MoodTracker';
import { SessionNotes } from './components/SessionNotes';

export default function App() {

  const handleTimerFinish = useCallback(() => {
    console.log('Temporizador Finalizado')
  }, []);

  return (
    <div className="appContainer">
      <main className="surface">
        <div className="header">
          <div>
            <h1>React Hooks</h1>
          </div>
        </div>

        <section className="widgetsGrid">
          <MoodTracker studentName="Paul" />
          <CountdownTimer initialSeconds={900} label="Enfoque 15 min" onFinish={handleTimerFinish} />
          <SessionNotes />
        </section>

      </main>
    </div>
  );
}
