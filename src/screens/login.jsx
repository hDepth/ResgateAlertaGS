import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'; // Importar mais componentes
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/login'; // Certifique-se que o caminho está correto
import api from '../services/api'; // Certifique-se que o caminho está correto

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Função de validação de e-mail
  const validateEmail = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError('O e-mail é obrigatório.');
    } else if (!/\S+@\S+\.\S+/.test(text)) { // Regex simples para formato de e-mail
      setEmailError('Formato de e-mail inválido.');
    } else {
      setEmailError('');
    }
  };

  // Função de validação de senha
  const validatePassword = (text) => {
    setPassword(text);
    if (!text) {
      setPasswordError('A senha é obrigatória.');
    } else if (text.length < 6) { // Exemplo: senha mínima de 6 caracteres
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    // Força a validação de todos os campos antes de enviar
    validateEmail(email);
    validatePassword(password);

    // Verifica se há erros nos campos ou se estão vazios
    if (emailError || passwordError || !email || !password) {
      Alert.alert('Erro no Login', 'Por favor, preencha os campos corretamente.');
      return;
    }

    console.log('Tentando login com:', email); // Log útil
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      console.log('Login bem-sucedido:', response.data);
      const { token, userId } = response.data;

      // Salva o token e userId no AsyncStorage para uso futuro
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', String(userId)); // Converte userId para string se for número

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('App'); // Navega para a parte principal do app
    } catch (error) {
      console.error('Erro no login:', error.response ? error.response.data : error.message);
      let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
      // Tratamento de mensagens de erro mais específicas da API ou de rede
      if (error.response && error.response.status === 401) {
          errorMessage = 'E-mail ou senha inválidos.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique se a API está rodando e o IP está correto.';
      }
      Alert.alert('Erro no Login', errorMessage);
    }
  };

  return (
    // KeyboardAvoidingView para evitar que o teclado cubra os inputs em iOS
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Container para a logo e título */}
        <View style={styles.logoContainer}>
          {/* A logo será carregada de ../../assets/icon.png */}
          <Image
            source={require('../../assets/icon.png')} // Caminho da sua logo
            style={styles.logo}
            resizeMode="contain" // Garante que a imagem se ajuste sem cortar
          />
          <Text style={styles.title}>Bem-vindo ao ResgateAlerta!</Text>
        </View>

        {/* Campo E-mail */}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={validateEmail}
          onBlur={() => validateEmail(email)} // Valida quando o campo perde o foco
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Campo Senha */}
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
          onBlur={() => validatePassword(password)} // Valida quando o campo perde o foco
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Botão Entrar */}
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]} // Estilos base e primário
          onPress={handleLogin}
          activeOpacity={0.7} // Efeito de toque
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Criar Conta */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]} // Estilos base e secundário
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}