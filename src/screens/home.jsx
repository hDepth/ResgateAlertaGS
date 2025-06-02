import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/home';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ResgateAlerta</Text>
      <Text style={styles.subtitle}>Sua segurança em primeiro lugar.</Text>

      <View style={styles.buttonContainer}>
        <Button title="Reportar Novo Alerta" onPress={() => navigation.navigate('CreateAlert')} />
      </View>
      <View style={styles.buttonContainer}>
        {/* Navega para a rota 'AlertDetails' que está no Drawer */}
        <Button title="Ver Meus Alertas" onPress={() => navigation.navigate('AlertDetails', { alertId: '123' })} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Gerenciar Áreas de Interesse" onPress={() => navigation.navigate('AreasOfInterest')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Meu Perfil" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
}