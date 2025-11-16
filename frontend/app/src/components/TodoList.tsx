import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_URL = 'http://10.0.2.2:8080/tarefas';

type Task = {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const headers = await getAuthHeader();
      if (!headers) return;
      try {
        const response = await axios.get(API_URL, { headers });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.task}>
          <Text>{item.titulo}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  task: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
