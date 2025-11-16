import auth from '@react-native-firebase/auth';

/**
 * Cria um novo usuário e define o displayName.
 */
export async function registrar(nome: string, email: string, senha: string) {
  const cred = await auth().createUserWithEmailAndPassword(email, senha);
  await cred.user.updateProfile({ displayName: nome });
  return cred.user;
}

/**
 * Faz login do usuário existente.
 */
export async function login(email: string, senha: string) {
  const cred = await auth().signInWithEmailAndPassword(email, senha);
  return cred.user;
}

/**
 * Retorna o header Authorization com token JWT do Firebase.
 */
export async function getAuthHeader() {
  const user = auth().currentUser;
  if (!user) return null;
  try {
    const token = await user.getIdToken(); // ✅ versão moderna
    return { Authorization: `Bearer ${token}` };
  } catch (err) {
    console.error('Erro ao pegar token do Firebase:', err);
    return null;
  }
}

/**
 * Faz logout.
 */
export async function logout() {
  await auth().signOut();
}
