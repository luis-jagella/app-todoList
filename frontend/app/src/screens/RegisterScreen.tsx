import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registrar } from '../utils/auth';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      await registrar(nome, email, senha);
      navigation.replace('Tarefas');
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua conta 🚀</Text>

      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text>Senha:</Text>
      <TextInput secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />

      <Text>Confirmar senha:</Text>
      <TextInput secureTextEntry value={confirmar} onChangeText={setConfirmar} style={styles.input} />

      <Button title="Cadastrar" onPress={handleRegister} />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Já tem conta? Fazer login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8, borderRadius: 8 },
  erro: { color: 'red', marginTop: 10 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});
