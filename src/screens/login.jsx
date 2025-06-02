import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/login';

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Lógica de login aqui
    console.log('Tentando login...');
    // Após o login bem-sucedido, navegue para a parte principal do app
    navigation.navigate('App'); // 'App' é a rota no RootStack que leva ao Drawer
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao ResgateAlerta!</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Criar Conta" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}