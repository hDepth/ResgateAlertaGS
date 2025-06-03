import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import StyledButton from '../components/StyledButton';
import styles from '../styles/AddEditAreaScreen';

export default function AddEditAreaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const areaToEdit = route.params?.areaToEdit;

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (areaToEdit) {
      setName(areaToEdit.name);
      const [lat, long] = areaToEdit.coordinates.replace('Lat: ', '').replace('Long: ', '').split(', ');
      setLatitude(parseFloat(lat));
      setLongitude(parseFloat(long));
    }
  }, [areaToEdit]);

  const handleSave = () => {
    if (!name || latitude === null || longitude === null) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma localização no mapa.');
      return;
    }

    const newArea = {
      id: areaToEdit ? areaToEdit.id : Date.now().toString(),
      name,
      coordinates: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
      active: true,
    };

    // Substitua este trecho pela lógica de envio à API quando estiver pronta
    Alert.alert('Sucesso', `Área ${areaToEdit ? 'atualizada' : 'adicionada'} com sucesso!`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>
        {areaToEdit ? 'Editar Área' : 'Nova Área de Interesse'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Área"
        value={name}
        onChangeText={setName}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude ?? -23.55052,
          longitude: longitude ?? -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setLatitude(latitude);
          setLongitude(longitude);
        }}
      >
        {latitude && longitude && (
          <Marker coordinate={{ latitude, longitude }} />
        )}
      </MapView>

      <StyledButton title="Salvar" onPress={handleSave} />
    </KeyboardAvoidingView>
  );
}
