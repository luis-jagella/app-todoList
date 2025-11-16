import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';

async function testarToken() {
  const user = auth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log('TOKEN FIREBASE:', token);
  } else {
    console.log('Nenhum usuário logado');
  }
}

testarToken();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) return Alert.alert('Aviso', 'Preencha todos os campos.');

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, senha);
      navigation.replace('Tarefas');
    } catch (err: any) {
      console.error('Erro ao logar:', err);
      Alert.alert('Erro', 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCriarConta = () => {
    navigation.navigate('Register')
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Logo no topo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* 🔹 Texto de boas-vindas */}
      <Text style={styles.titulo}>Seja bem-vindo</Text>

      {/* 🔹 Campos de login */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* 🔹 Botão de entrar */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={loading}>
        <Text style={styles.textoBotao}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      {/* 🔹 Link para criar conta */}
      <TouchableOpacity onPress={handleCriarConta}>
        <Text style={styles.link}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  botao: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    marginTop: 20,
    fontSize: 16,
  },
});
