// src/screens/ProfileScreen.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/profile';
import StyledButton from '../components/StyledButton';
import { COLORS } from '../constants/Theme';

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Dados de usuário mock para demonstração
  const userData = {
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 98765-4321',
    address: 'Rua da Esperança, 123 - São Paulo, SP',
    memberSince: 'Janeiro de 2023',
  };

  const handleLogout = () => {
    console.log('Realizando logout...');
    // Redireciona para a tela de login (Root Stack) e reseta o histórico
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <MaterialIcons name="person" style={styles.avatarPlaceholder} />
        {/* Você pode integrar um <Image /> aqui para o avatar */}
      </View>
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.email}>{userData.email}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.infoValue}>{userData.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Endereço:</Text>
          <Text style={styles.infoValue}>{userData.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Membro desde:</Text>
          <Text style={styles.infoValue}>{userData.memberSince}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Editar Perfil"
          onPress={() => console.log('Navegar para tela de edição de perfil')}
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