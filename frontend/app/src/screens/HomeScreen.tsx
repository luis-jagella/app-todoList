import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { getAuthHeader } from '../utils/auth';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8080/tarefas';

async function fetchTasks() {
  const headers = await getAuthHeader();
  if (!headers) return;

  try {
    const response = await axios.get(API_URL, { headers });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

export default function HomeScreen({ navigation }: any) {
  const [nome, setNome] = useState('');

  const entrar = () => {
    if (nome.trim() !== '') {
      navigation.navigate('TodoList', { nome });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // coloca teu logo em frontend/app/assets/logo.png
        style={styles.logo}
      />
      <Text style={styles.titulo}>To-Do List</Text>
      <Text style={styles.subtitulo}>Organize seu dia com praticidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Entrar" onPress={entrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2f3640',
  },
  subtitulo: {
    fontSize: 16,
    color: '#718093',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});