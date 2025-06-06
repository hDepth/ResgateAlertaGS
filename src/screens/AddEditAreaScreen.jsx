import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage
import StyledButton from '../components/StyledButton';
import styles from '../styles/AddEditAreaScreen';
import { COLORS } from '../constants/Theme'; // Para a cor do marker

export default function AddEditAreaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const areaToEdit = route.params?.areaToEdit;

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapRegion, setMapRegion] = useState(null); // Estado para a região do mapa

  useEffect(() => {
    if (areaToEdit) {
      setName(areaToEdit.name);
      const [lat, long] = areaToEdit.coordinates.replace('Lat: ', '').replace('Long: ', '').split(', ');
      const parsedLat = parseFloat(lat);
      const parsedLong = parseFloat(long);
      setLatitude(parsedLat);
      setLongitude(parsedLong);
      // Ajusta a região inicial do mapa para a área a ser editada
      setMapRegion({
        latitude: parsedLat,
        longitude: parsedLong,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      // Região inicial padrão para nova área (ex: centro de SP ou qualquer outra coordenada padrão)
      setMapRegion({
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [areaToEdit]);

  const handleSave = async () => { // Função assíncrona
    if (!name || latitude === null || longitude === null) {
      Alert.alert('Erro', 'Preencha o nome e selecione uma localização no mapa.');
      return;
    }

    const newArea = {
      id: areaToEdit ? areaToEdit.id : Date.now().toString(), // Usa o ID existente ou gera um novo
      name,
      coordinates: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
      active: areaToEdit ? areaToEdit.active : true, // Mantém o status ativo ou define como true para nova área
    };

    try {
      const storedAreas = await AsyncStorage.getItem('user_areas_of_interest');
      let areas = storedAreas ? JSON.parse(storedAreas) : [];

      if (areaToEdit) {
        // Modo edição: substitui a área existente
        areas = areas.map(area => (area.id === newArea.id ? newArea : area));
      } else {
        // Modo adição: adiciona a nova área
        areas.push(newArea);
      }

      await AsyncStorage.setItem('user_areas_of_interest', JSON.stringify(areas));
      Alert.alert('Sucesso', `Área ${areaToEdit ? 'atualizada' : 'adicionada'} com sucesso!`);
      navigation.goBack();
    } catch (e) {
      console.error('Erro ao salvar área no AsyncStorage:', e);
      Alert.alert('Erro', 'Não foi possível salvar a área de interesse.');
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    // Centraliza o mapa no novo marcador
    setMapRegion({ ...mapRegion, latitude, longitude });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>
        {areaToEdit ? 'Editar Área de Interesse' : 'Adicionar Nova Área'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Área (ex: Casa, Trabalho)"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.mapInstruction}>
        Toque no mapa para selecionar a localização:
      </Text>

      <MapView
        style={styles.map}
        region={mapRegion} // Usa o estado de região para controlar o mapa
        onRegionChangeComplete={setMapRegion} // Atualiza a região quando o usuário arrasta o mapa
        onPress={handleMapPress}
      >
        {latitude !== null && longitude !== null && (
          <Marker
            coordinate={{ latitude, longitude }}
            pinColor={COLORS.primary} // Cor do marcador
            title={name || "Nova Área"}
            description={`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`}
          />
        )}
      </MapView>
      {latitude !== null && longitude !== null && (
        <Text style={styles.coordinatesText}>
          Coordenadas Selecionadas: Lat: {latitude.toFixed(6)}, Long: {longitude.toFixed(6)}
        </Text>
      )}

      <StyledButton title="Salvar Área" onPress={handleSave} color={COLORS.success} />
    </KeyboardAvoidingView>
  );
}