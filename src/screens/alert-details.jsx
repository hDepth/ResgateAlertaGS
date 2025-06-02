import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/alert_details';

export default function AlertDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Não precisa de tipagem para params em JS

  const { alertId } = route.params || { alertId: 'N/A' }; // Acessa os parâmetros diretamente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Alerta</Text>
      <Text style={styles.text}>ID do Alerta: {alertId}</Text>
      <Text style={styles.text}>Informações detalhadas sobre o incidente.</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}