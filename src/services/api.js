import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Você precisará instalar esta lib se ainda não tiver

// --- IMPORTANTE: SUBSTITUA ESTE IP PELO SEU IP REAL ---
// Use o IP da sua máquina na rede local (ex: 192.168.0.10) e a porta da sua API Java (8080)
// Se você está testando no simulador Android ou no dispositivo físico, 'localhost' NÃO FUNCIONA.
const API_BASE_URL = 'http://192.168.0.10:8080'; // <-- SUBSTITUA PELO SEU IP

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições protegidas
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken'); // Pega o token salvo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o cabeçalho Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;