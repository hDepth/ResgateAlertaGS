import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/register'; // Certifique-se que o caminho está correto
import api from '../services/api'; // Certifique-se que o caminho está correto

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para mensagens de erro dos campos
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Funções de validação
  const validateName = (text) => {
    setName(text);
    if (!text.trim()) { // .trim() remove espaços em branco extras
      setNameError('O nome é obrigatório.');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (text) => {
    setEmail(text);
    if (!text.trim()) {
      setEmailError('O e-mail é obrigatório.');
    } else if (!/\S+@\S+\.\S+/.test(text)) {
      setEmailError('Formato de e-mail inválido.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (!text) {
      setPasswordError('A senha é obrigatória.');
    } else if (text.length < 6) { // Exemplo: senha mínima de 6 caracteres
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
    // Revalida a confirmação de senha sempre que a senha principal muda
    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
    } else if (confirmPassword && text === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (!text) {
      setConfirmPasswordError('A confirmação da senha é obrigatória.');
    } else if (text !== password) {
      setConfirmPasswordError('As senhas não coincidem.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = async () => {
    // Força a validação de todos os campos antes de enviar
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // Verifica se há erros nos campos ou se estão vazios após a validação
    if (nameError || emailError || passwordError || confirmPasswordError || !name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Erro no Cadastro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    console.log('Tentando cadastro com:', email); // Log útil
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });

      console.log('Cadastro bem-sucedido:', response.data);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Por favor, faça login.');
      navigation.navigate('Login'); // Navega para a tela de Login
    } catch (error) {
      console.error('Erro no cadastro:', error.response ? error.response.data : error.message);
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique se a API está rodando e o IP está correto.';
      }
      Alert.alert('Erro no Cadastro', errorMessage);
    }
  };

  return (
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
            resizeMode="contain"
          />
          <Text style={styles.title}>Crie sua Conta</Text>
        </View>

        {/* Campo Nome Completo */}
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          placeholder="Nome Completo"
          value={name}
          onChangeText={validateName}
          onBlur={() => validateName(name)}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        {/* Campo E-mail */}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={validateEmail}
          onBlur={() => validateEmail(email)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Campo Senha */}
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
          onBlur={() => validatePassword(password)}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Campo Confirmar Senha */}
        <TextInput
          style={[styles.input, confirmPasswordError ? styles.inputError : null]}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          onBlur={() => validateConfirmPassword(confirmPassword)}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleRegister}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Botão Já tenho conta */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Já tenho conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}