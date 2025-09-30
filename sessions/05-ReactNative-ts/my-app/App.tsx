import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ListRenderItem,
  View,
  FlatList,
  Task,
} from "react-native";

import {SectionSkills } from './components/Section';
import { CardProfile } from './components/CardProfile';
const getGreeting = (): string => {
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  if (hour < 6) return `${hour}:${minutes} No molestes`;
  if (hour < 12) return `${hour}:${minutes} Buenos días`;
  if (hour < 18) return `${hour}:${minutes} Buenas tardes`;
  return `${hour}:${minutes} Buenas noches`;
};

type Skill = {
  id: string;
  name: string;
};

const skills: Skill[] = [
  { id: "1", name: "JavaScript" },
  { id: "2", name: "TypeScript" },
  { id: "3", name: "React" },
];

type Hobby = {
  id: string;
  name: string;
  icon: string;
}
const hobbies: Hobby[] = [
  {
    id: "1",
    name: "Wally",
    icon:  '😓'
  }, 
  {
    id: "2",
    name: "Dota 2",
    icon: '🫅'
  },
  {
    id: '3',
    name: "Cook",
    icon: '🤠'
  },
  {
    id: '4',
    name: "Programacion Competitiva",
    icon: '🥰'
  }
]

const renderHobby:ListRenderItem<Hobby> = ({item}) => {
  return (
    <View style={styles.hobbyCard}>
      <Text style={styles.iconText}>{item.icon}</Text>
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
  )
};

type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

const tasks: Task[] = [
  { 
    id: '1', 
    title: 'Cocinar',
    description: 'Elaborar un rico Fricase',
    completed: false
  },
  { 
    id: '2', 
    title: 'Ir al Gym',
    description: 'Rutina de Pierna',
    completed: false
  },
  { 
    id: '3', 
    title: 'Acabar la Tarea',
    description: 'Consultar a Chatgptcito',
    completed: false
  },

]



export default function App() {
  const [tasksState, setTasksState] = useState(tasks)

  const completeTask = (currentTask:Task) => {
    setTasksState((prev) =>
      prev.map((task) =>
        task.id === currentTask.id
          ? { ...task, completed: true }
          : task
      )
    );
    console.log(tasksState);
  }
  const renderTask:ListRenderItem<Task> = ({item}) => {
    return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => completeTask(item)}
      style={[styles.taskCard, item.completed && styles.taskCompleted]}
    >
      <Text style={styles.taskTitle}>
        {item.title}
      </Text>
      <Text style={styles.taskDescription}>
        {item.description}
      </Text>
    </TouchableOpacity>)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.heroTitle}>Paul Landaeta</Text>
          <Text style={styles.heroSubtitle}>
            Docente de ISC y desarrollador de software full-stack.
          </Text>
        </View>

        <CardProfile/>
        <SectionSkills
          title="Habilidades"
          description="Mis habilidades que dicen que se"
        >
          <View style={styles.skillGroup}>
            {skills.map((skill) => {
                        return (
                          <View style={styles.skill}>
                            <Text style={styles.textSkill}>{skill.name}</Text>
                          </View>
                        );
                      })}
          </View>
        </SectionSkills>
        <SectionSkills 
          title="Hobbies"
          description="Mis pasatiempos favoritos"
        >
          <FlatList
            data={hobbies}
            horizontal
            renderItem={renderHobby}
            > 
          </FlatList>
        </SectionSkills>

        <SectionSkills 
          title="Task"
          description="Mis tareas pendientes"
        >
          <FlatList
            data={tasksState}
            renderItem={renderTask}
            > 
          </FlatList>
        </SectionSkills>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: { padding: 20 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 16, color: "#475569", fontWeight: "600" },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 4,
  },
  heroSubtitle: {
    marginTop: 10,
    color: "#475569",
    lineHeight: 20,
  },


  
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skill: {
    paddingHorizontal: 10,
    backgroundColor: '#2563eb',
    marginHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 15
  },
  textSkill: {
    color: 'white',
    fontWeight: 600
  },
  hobbyCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 20,
    width: 160,
    height: 120,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0'   
  },
  iconText: {
    fontSize: 35
  },
  nameText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#2929a3ff'
  },
  taskCard: {
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1
  },
  taskTitle: {
    fontSize: 20, 
    fontWeight: 600,
  },
  taskDescription: {
    fontSize: 16, 
    fontWeight: 500
  },
  taskCompleted: {
    backgroundColor: 'green'
  }
});
