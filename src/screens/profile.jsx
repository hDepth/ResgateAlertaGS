// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { profileStyles as styles } from '../styles/profile'; // Importar estilos separados

const API_BASE_URL = 'http://192.168.0.10:8080'; // Lembre-se de substituir pelo IP correto!

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  // Dados simulados para conquistas e estatísticas
  // ATENÇÃO: Para dados reais, você precisaria estender sua API Spring Boot
  const [statsData, setStatsData] = useState({
    alertsSent: 15,
    rescuesParticipated: 5,
  });

  const [achievementsData, setAchievementsData] = useState([
    { id: '1', name: 'Primeiro Alerta', description: 'Enviou seu primeiro alerta com sucesso!', icon: '🌟' },
    { id: '2', name: 'Herói Local', description: 'Participou de 3 resgates.', icon: '🏆' },
    { id: '3', name: 'Comunicador', description: 'Enviou mais de 10 alertas.', icon: '🗣️' },
    { id: '4', name: 'Salvador de Vidas', description: 'Participou de 5 resgates.', icon: '❤️‍🩹' },
  ]);

  // Função para buscar o perfil do usuário (mantida como antes)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const userId = await AsyncStorage.getItem('userId');
        console.log('ID do usuário recuperado do AsyncStorage:', userId);

        if (!userId) {
          setError('ID do usuário não encontrado. Por favor, faça login novamente.');
          setLoading(false);
          Alert.alert("Erro", "ID do usuário não encontrado. Por favor, faça login novamente.");
          navigation.navigate('Login');
          return;
        }

        const response = await api.get(`/users/${userId}`);
        setProfileData(response.data);
        console.log("Dados do perfil:", response.data);

      } catch (err) {
        console.error("Erro ao buscar perfil do usuário:", err);
        if (err.response) {
          setError(`Erro ao buscar perfil do usuário: ${err.response.status} - ${err.response.data.message || err.response.data}`);
        } else if (err.request) {
          setError("Erro de rede. Verifique sua conexão ou o servidor.");
        } else {
          setError("Erro desconhecido ao buscar perfil.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Função para lidar com a exclusão do usuário (COM A CORREÇÃO DE NAVEGAÇÃO)
  const handleDeleteUser = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              setLoading(true);
              const userId = await AsyncStorage.getItem('userId');
              if (!userId) {
                Alert.alert("Erro", "ID do usuário não encontrado. Faça login novamente.");
                setLoading(false);
                return;
              }

              await api.delete(`/users/${userId}`);

              Alert.alert("Sucesso", "Sua conta foi excluída com sucesso.");
              
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userId');

              // --- CORREÇÃO APLICADA AQUI ---
              // Navega para a tela de Login que está aninhada dentro do navegador 'Auth'
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Auth', // Nome da tela no RootStack que contém o AuthNavigator
                    state: {
                      routes: [
                        {
                          name: 'Login', // Nome da tela de Login dentro do AuthNavigator
                        },
                      ],
                    },
                  },
                ],
              });

            } catch (err) {
              console.error("Erro ao excluir usuário:", err);
              if (err.response) {
                Alert.alert("Erro", `Falha ao excluir conta: ${err.response.status} - ${err.response.data.message || err.response.data}`);
              } else if (err.request) {
                Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor para excluir a conta.");
              } else {
                Alert.alert("Erro", "Ocorreu um erro inesperado ao tentar excluir a conta.");
              }
            } finally {
              setLoading(false);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Ir para Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum dado de perfil disponível.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Card de Informações do Usuário */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Informações Pessoais</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{profileData.name || 'Não informado'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profileData.email || 'Não informado'}</Text>
        </View>
        {/* Adicione outros campos reais do seu perfil aqui, se houver */}
      </View>

      {/* Card de Estatísticas */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Estatísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statsData.alertsSent}</Text>
            <Text style={styles.statLabel}>Alertas Enviados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statsData.rescuesParticipated}</Text>
            <Text style={styles.statLabel}>Resgates Participados</Text>
          </View>
        </View>
      </View>

      {/* Card de Conquistas */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Conquistas</Text>
        <View style={styles.achievementsGrid}>
          {achievementsData.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Botão de Excluir Usuário */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
        <Text style={styles.deleteButtonText}>Excluir Usuário</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ProfileScreen;