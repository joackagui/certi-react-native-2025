import { useState, useMemo } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { CardProfile } from "./components/CardProfile";
import { HeroHeader } from "./components/HeroHeader";
import { HobbyCarousel } from "./components/HobbyCarousel";
import { Section } from "./components/Section";
import { SkillChips } from "./components/SkillChips";
import { TaskList } from "./components/TaskList";
import { Hobby, Skill, Task } from "./types";


const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

const hobbies: Hobby[] = [
  { id: "1", title: "Crear apps móviles", icon: "📱" },
  { id: "2", title: "Wally entre amigos", icon: "⚽️" },
  { id: "3", title: "Chicha sessions", icon: "🎧" },
  { id: "4", title: "Fotografía urbana", icon: "📸" },
];

const skills: Skill[] = [
  { id: "1", title: "TypeScript" },
  { id: "2", title: "UI prototyping" },
  { id: "3", title: "Design Systems" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Explorar Expo Router",
    description: "Crea una demo pequeña con navegación tipo stack.",
    due: "Hoy",
    completed: false,
  },
  {
    id: "2",
    title: "Practicar animaciones",
    description: "Investiga Reanimated y arma una micro-interacción.",
    due: "Mañana",
    completed: false,
  },
  {
    id: "3",
    title: "Revisar accesibilidad",
    description: "Evalúa contraste y tamaños de fuente del proyecto.",
    due: "Viernes",
    completed: false,
  },
];

export default function App() {
  const [likes, setLikes] = useState<number>(24);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const likesLabel = useMemo(() => {
    const noun = likes === 1 ? "persona" : "personas";
    return `${likes} ${noun} dicen hola`;
  }, [likes]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [completedCount, tasks.length]);

  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const greetingMessage = `${getGreeting()},`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <HeroHeader
          greeting={greetingMessage}
          title="Juan Pérez"
          subtitle="Estudiante UPB enfocado en crear experiencias móviles memorables."
        />

        <CardProfile
          imageUri="https://i.pravatar.cc/220?img=6"
          role="React Native Developer en progreso"
          meta="La Paz · Cohorte 2025"
          likesLabel={likesLabel}
          onLike={() => setLikes((prev) => prev + 1)}
        />

        <Section title="Skills" description="Herramientas favoritas este semestre">
          <SkillChips skills={skills} />
        </Section>

        <Section title="Mis hobbies" description="Lo que me inspira a seguir creando">
          <HobbyCarousel hobbies={hobbies} />
        </Section>

        <Section
          title="Tareas de práctica"
          description="Ideas para reforzar tu aprendizaje en la sesión"
        >
          <TaskList tasks={tasks} progress={progress} onToggleTask={handleToggleTask} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
});
