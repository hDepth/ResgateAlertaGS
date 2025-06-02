import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/create-alert';

export default function CreateAlertScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar Novo Alerta</Text>
      <Text style={styles.text}>Formulário para o usuário enviar um novo alerta.</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}