import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import StyledButton from '../components/StyledButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/AddEditAreaScreen'; // Usa seu arquivo de estilo externo

export default function AddEditAreaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const areaToEdit = route.params?.areaToEdit;

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (areaToEdit) {
      setName(areaToEdit.name);
      const coords = areaToEdit.coordinates.replace('Lat: ', '').replace('Long: ', '').split(', ');
      setLatitude(coords[0]);
      setLongitude(coords[1]);
    }
  }, [areaToEdit]);

  const handleSave = () => {
    if (!name || !latitude || !longitude) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Aqui você pode enviar os dados para API ou atualizar o estado global/contexto

    Alert.alert('Sucesso', `Área ${areaToEdit ? 'atualizada' : 'adicionada'} com sucesso!`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{areaToEdit ? 'Editar Área' : 'Nova Área de Interesse'}</Text>

      <TextInput
        placeholder="Nome da Área"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        style={styles.input}
        keyboardType="numeric"
      />

      <StyledButton title="Salvar" onPress={handleSave} />
    </View>
  );
}
