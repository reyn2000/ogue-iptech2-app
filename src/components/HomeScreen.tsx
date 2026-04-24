import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

import TaskItem from './TaskItem';

type Task = {
  id: string;
  title: string;
};

type Props = {
  username: string;
  onLogout: () => void;
};

const HomeScreen: React.FC<Props> = ({ username, onLogout }) => {
  // ✅ Mock data
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Buy groceries' },
    { id: '2', title: 'Finish assignment' },
    { id: '3', title: 'Walk the dog' },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      title: newTask,
    };

    console.log('Task added:', newTask);

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const deleteTask = (id: string) => {
    console.log('Task deleted:', id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}</Text>

      <Button title="Logout" onPress={onLogout} />

      <TextInput
        placeholder="Add new task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={deleteTask} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});