// src/screens/ProfileScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles/profile';

const API_BASE_URL = 'http://192.168.0.10:8080';

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
  (error) => Promise.reject(error)
);

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const navigation = useNavigation();

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

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const userId = await AsyncStorage.getItem('userId');
      console.log('ID do usuário recuperado do AsyncStorage:', userId);

      if (!userId) {
        setError('ID do usuário não encontrado. Por favor, faça login novamente.');
        Alert.alert("Erro", "ID do usuário não encontrado. Por favor, faça login novamente.");
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth', state: { routes: [{ name: 'Login' }] } }],
        });
        return;
      }

      const response = await api.get(`/users/${userId}`);
      const fetchedData = response.data;
      setProfileData(fetchedData);
      setTempName(fetchedData.name || '');
      setTempEmail(fetchedData.email || '');
      console.log("Dados do perfil:", fetchedData);

    } catch (err) {
      console.error("Erro ao buscar perfil do usuário:", err);
      if (err.response) {
        setError(`Erro ao buscar perfil do usuário: ${err.response.status} - ${err.response.data.message || 'Erro no servidor'}`);
      } else if (err.request) {
        setError("Erro de rede. Verifique sua conexão ou o servidor.");
      } else {
        setError("Erro desconhecido ao buscar perfil.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      return () => {};
    }, [fetchUserProfile])
  );

  const handleUpdateUser = async () => {
    Alert.alert(
      "Confirmar Alterações",
      "Tem certeza que deseja salvar as alterações no seu perfil?",
      [
        { text: "Cancelar", style: "cancel", onPress: handleCancelEdit },
        {
          text: "Salvar",
          onPress: async () => {
            try {
              setLoading(true);
              const userId = await AsyncStorage.getItem('userId');
              if (!userId) {
                Alert.alert("Erro", "ID do usuário não encontrado. Faça login novamente.");
                setLoading(false);
                return;
              }

              const updatedData = {
                name: tempName,
                email: tempEmail,
              };

              if (!tempName || tempName.length < 3) {
                  Alert.alert("Erro de Validação", "O nome deve ter no mínimo 3 caracteres.");
                  setLoading(false);
                  return;
              }
              if (!tempEmail || !/\S+@\S+\.\S+/.test(tempEmail)) {
                  Alert.alert("Erro de Validação", "O formato do e-mail é inválido.");
                  setLoading(false);
                  return;
              }

              const response = await api.put(`/users/${userId}`, updatedData);
              
              setProfileData(response.data);
              setIsEditing(false);
              Alert.alert("Sucesso", "Perfil atualizado com sucesso!");

            } catch (err) {
              console.error("Erro ao atualizar usuário:", err.response || err);
              let errorMessage = "Ocorreu um erro inesperado ao tentar atualizar o perfil.";
              if (err.response && err.response.data) {
                if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.errors && Array.isArray(err.response.data.errors)) {
                    errorMessage = err.response.data.errors.map(e => e.defaultMessage).join('\n');
                } else if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data;
                } else {
                    errorMessage = JSON.stringify(err.response.data);
                }
              } else if (err.request) {
                errorMessage = "Erro de Rede: Não foi possível conectar ao servidor para atualizar o perfil.";
              }
              Alert.alert("Erro", errorMessage);
            } finally {
              setLoading(false);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleCancelEdit = () => {
    if (profileData) {
      setTempName(profileData.name || '');
      setTempEmail(profileData.email || '');
    }
    setIsEditing(false);
  };

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

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Auth',
                    state: {
                      routes: [
                        {
                          name: 'Login',
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

      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Informações Pessoais</Text>
        
        {isEditing ? (
          <>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Novo Nome"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={tempEmail}
              onChangeText={setTempEmail}
              placeholder="Novo Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
                  <Text style={styles.editButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.editButtonText}>Cancelar Edição</Text>
                </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{profileData.name || 'Não informado'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{profileData.email || 'Não informado'}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

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

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
        <Text style={styles.deleteButtonText}>Excluir Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;