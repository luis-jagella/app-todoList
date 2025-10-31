import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'http://10.0.2.2:8080/tarefas';

  const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Tarefas recebidas:', response.data);
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
        concluida: false
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      console.log('Erro ao adicionar tarefa:', err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.log('Erro ao deletar tarefa:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
              <Text>ID: {item.id}</Text>
              <Text>Título: {item.titulo}</Text>
              <Text>Concluída: {item.concluida ? 'Sim' : 'Não'}</Text>
              <Button title="Excluir" onPress={() => deleteTask(item.id)} color="red" />
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  task: { padding: 10, borderBottomWidth: 1, marginBottom: 5 }
});
