import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { getAuthHeader, logout } from '../utils/auth';

const API_URL = 'http://10.0.2.2:8080/tarefas';

export default function TodoListScreen({ navigation }: any) {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserName(user.displayName || user.email?.split('@')[0] || 'usuário');
    }
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      setLoading(true);
      const headers = await getAuthHeader();
      if (!headers) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const response = await fetch(API_URL, { headers });
      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setTarefas(data);
    } catch (err: any) {
      console.error('Erro ao buscar tarefas:', err);
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    } finally {
      setLoading(false);
    }
  };

  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return Alert.alert('Aviso', 'Digite uma tarefa.');

    try {
      const headers = await getAuthHeader();
      if (!headers) return Alert.alert('Erro', 'Usuário não autenticado.');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: novaTarefa }),
      });

      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

      setNovaTarefa('');
      buscarTarefas();
    } catch (err: any) {
      console.error('Erro ao adicionar tarefa:', err);
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa.');
    }
  };

  const removerTarefa = async (id: number) => {
    try {
      const headers = await getAuthHeader();
      if (!headers) return Alert.alert('Erro', 'Usuário não autenticado.');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);

      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error('Erro ao remover tarefa:', err);
      Alert.alert('Erro', 'Não foi possível remover a tarefa.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (err) {
      console.error('Erro ao sair:', err);
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boasVindas}>Olá, {userName}! 👋</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.sair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <Button title="Adicionar" onPress={adicionarTarefa} />
      </View>

      {loading ? (
        <Text>Carregando tarefas...</Text>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarefa}>
              <Text style={styles.tituloTarefa}>{item.titulo}</Text>
              <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                <Text style={styles.remover}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Nenhuma tarefa cadastrada.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  boasVindas: { fontSize: 20, fontWeight: 'bold' },
  sair: { color: 'red', fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  tarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  tituloTarefa: { fontSize: 16 },
  remover: { fontSize: 18, color: 'red' },
});
