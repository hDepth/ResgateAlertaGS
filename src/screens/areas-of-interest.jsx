import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/areas-of-interest';

export default function AreasOfInterestScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Áreas de Interesse</Text>
      <Text style={styles.text}>Gerencie os locais que você quer monitorar para alertas.</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}