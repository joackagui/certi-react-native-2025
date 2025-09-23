import { useCallback } from 'react';

import './App.css';
import { CountdownTimer } from './components/CountdownTimer';
import { MoodTracker } from './components/MoodTracker';
import { SessionNotes } from './components/SessionNotes';
import { TitleComponent } from './components/Title.module';
export default function App() {

  const handleTimerFinish = useCallback(() => {
    console.log('Temporizador Finalizado')
  }, []);

  return (
    <div className="appContainer">
      <main className="surface">
        <TitleComponent titleName="React Hooks"/>
        <section className="widgetsGrid">
          <MoodTracker studentName="Paul" />
          <CountdownTimer initialSeconds={400} onFinish={handleTimerFinish} />
          <SessionNotes />
        </section>

      </main>
    </div>
  );
}
