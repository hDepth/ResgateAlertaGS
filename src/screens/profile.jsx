// src/screens/ProfileScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Certifique-se que o caminho está correto
import styles from '../styles/profile';
import StyledButton from '../components/StyledButton';
import { COLORS, SPACING } from '../constants/Theme';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      // --- LOGS PARA DEBUG ---
      console.log('Token recuperado:', userToken ? 'Sim' : 'Não');
      console.log('ID do Usuário recuperado:', userId);
      // --- FIM LOGS PARA DEBUG ---

      if (!userToken || !userId) {
        setError('Nenhum usuário logado. Faça login novamente.');
        setLoading(false);
        return;
      }

      console.log(`Tentando buscar dados para userId: ${userId}`);
      console.log(`Com token: Bearer ${userToken.substring(0, 10)}... (truncado para segurança)`); // Não logue o token completo

      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // --- LOGS PARA DEBUG ---
      console.log('Resposta da API (status):', response.status);
      console.log('Resposta da API (dados):', response.data);
      // --- FIM LOGS PARA DEBUG ---

      setUserData(response.data);
    } catch (err) {
      // --- LOGS PARA DEBUG: MAIS DETALHES DO ERRO ---
      console.error('Erro ao buscar dados do usuário:', err); // Loga o objeto de erro completo
      if (err.response) {
        console.error('Detalhes do erro da API:', err.response.status, err.response.data);
      } else if (err.request) {
        console.error('Erro na requisição (sem resposta):', err.request);
      } else {
        console.error('Outro erro:', err.message);
      }
      // --- FIM LOGS PARA DEBUG ---

      setError('Erro ao carregar perfil. Tente novamente mais tarde.');

      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        Alert.alert('Sessão Expirada', 'Sua sessão expirou. Por favor, faça login novamente.');
        await AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      return () => {};
    }, [fetchUserData])
  );

  const handleLogout = () => {
    navigation.navigate('LogoutConfirm');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={50} color={COLORS.danger} />
        <Text style={styles.errorText}>{error}</Text>
        <StyledButton
          title="Tentar Novamente"
          onPress={fetchUserData}
          color={COLORS.primary}
          style={{ marginTop: SPACING.medium }}
        />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Não foi possível carregar as informações do usuário.</Text>
        <StyledButton
          title="Ir para o Login"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })}
          color={COLORS.primary}
          style={{ marginTop: SPACING.medium }}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <MaterialIcons name="person" style={styles.avatarPlaceholder} />
      </View>
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.email}>{userData.email}</Text>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Editar Perfil"
          onPress={() => Alert.alert('Funcionalidade em desenvolvimento', 'A tela de edição de perfil será implementada aqui.')}
          color={COLORS.primary}
          style={{ marginBottom: SPACING.medium }}
        />
        <StyledButton
          title="Sair do Aplicativo"
          onPress={handleLogout}
          color={COLORS.danger}
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
}