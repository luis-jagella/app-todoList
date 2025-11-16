import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, Button, View, StyleSheet } from 'react-native';
import axios from 'axios';

type Task = {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'http://10.0.2.2:8080/tarefas'; // backend

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      console.log('Erro ao buscar tarefas:', err);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post(API_URL, {
        titulo: newTask,
        descricao: '',
        concluida: false,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Adicionar" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.titulo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  task: { padding: 10, borderBottomWidth: 1 },
});
