import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Task = {
  id: string;
  title: string;
};

type Props = {
  task: Task;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text>{task.title}</Text>
      <Button title="Delete" onPress={() => onDelete(task.id)} />
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});