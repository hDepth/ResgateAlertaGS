'http://192.168.0.10:8080'

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Certifique-se de que axios está instalado (npm install axios)

// Configure seu axios com a URL base da API
// Use o IP da sua máquina ou o IP do host do seu emulador/dispositivo
// Ex: 'http://192.168.1.100:8080' ou 'http://10.0.2.2:8080' (para Android Studio Emulator)
const API_BASE_URL = 'http://192.168.0.10:8080'; // <-- IMPORTANTE: Troque SEU_IP_DA_API pelo IP REAL da sua máquina!

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log('Requisição Enviada com Cabeçalho:', config.headers.Authorization); // Para depuração
  return config;
}, (error) => {
  return Promise.reject(error);
});

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const userId = await AsyncStorage.getItem('userId'); // Supondo que você salve o userId no AsyncStorage no login
        // Se você não salvar o userId separadamente, você precisará decodificar o token JWT
        // para obter o ID do usuário. Isso requer uma biblioteca JWT no React Native (ex: jwt-decode).
        // Por agora, vamos supor que userId está salvo.
        console.log('ID do usuário recuperado do AsyncStorage:', userId);

        if (!userId) {
          setError('ID do usuário não encontrado. Por favor, faça login novamente.');
          setLoading(false);
          return;
        }

        const response = await api.get(`/users/${userId}`); // Chama o endpoint da API
        setUserData(response.data);
      } catch (err) {
        console.error('Erro ao buscar perfil do usuário:', err);
        if (err.response) {
          // Erro vindo da API (ex: 404, 500)
          setError(`Erro ao carregar perfil: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
          if (err.response.status === 401 || err.response.status === 403) {
            Alert.alert('Sessão Expirada', 'Por favor, faça login novamente.');
            // Aqui você pode adicionar lógica para redirecionar para a tela de Login
          }
        } else if (err.request) {
          // A requisição foi feita, mas não houve resposta (rede)
          setError('Erro de rede: Verifique sua conexão ou o endereço da API.');
        } else {
          // Erro na configuração da requisição
          setError('Erro inesperado ao configurar a requisição.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez ao montar o componente

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Nenhum dado de usuário disponível.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>ID do Usuário:</Text>
        <Text style={styles.value}>{userData.id}</Text>
      </View>
      {/* Adicione outros campos do seu UserResponse DTO aqui */}
      {/* Por exemplo: */}
      {/* <View style={styles.detailCard}>
        <Text style={styles.label}>Data de Criação:</Text>
        <Text style={styles.value}>{userData.createdAt}</Text>
      </View> */}
      {/* ... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;