import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (alreadyExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      return { ...task, done: !task.done };
    });

    setTasks([...updatedTasks]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newListTask = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        title: taskNewTitle,
      };
    });

    setTasks([...newListTask]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
