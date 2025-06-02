import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/register';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const handleRegister = () => {
    // Lógica de cadastro aqui
    console.log('Tentando cadastro...');
    // Após o cadastro, você pode navegar para a tela de Login
    navigation.navigate('Login'); // Volta para Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleRegister} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Já tenho conta" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}