// src/screens/AreasOfInterestScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/areas-of-interest';
import StyledButton from '../components/StyledButton';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

export default function AreasOfInterestScreen() {
  const navigation = useNavigation();
  const [areas, setAreas] = useState([
    { id: '1', name: 'Casa', coordinates: 'Lat: -23.123, Long: -46.456', active: true },
    { id: '2', name: 'Trabalho', coordinates: 'Lat: -23.789, Long: -46.987', active: false },
    { id: '3', name: 'Escola Filhos', coordinates: 'Lat: -23.321, Long: -46.765', active: true },
  ]);

  const handleDeleteArea = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja remover esta área de interesse?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            setAreas(areas.filter(area => area.id !== id));
            Alert.alert('Sucesso', 'Área removida com sucesso!');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleAddArea = () => {
    Alert.alert(
      'Adicionar Área',
      'Aqui você implementaria a funcionalidade de adicionar uma nova área de interesse, talvez usando um mapa para seleção ou formulário.'
    );
    // Mock de adição para demonstração
    const newId = String(areas.length + 1);
    setAreas([...areas, { id: newId, name: `Nova Área ${newId}`, coordinates: `Lat: Mock, Long: Mock`, active: true }]);
  };

  const renderAreaItem = (item) => (
    <View key={item.id} style={styles.areaCard}>
      <View style={styles.areaTextContainer}>
        <Text style={styles.areaName}>{item.name}</Text>
        <Text style={styles.areaCoordinates}>{item.coordinates}</Text>
      </View>
      <StyledButton
        title="Excluir"
        onPress={() => handleDeleteArea(item.id)}
        color={COLORS.danger}
        style={styles.deleteButton}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minhas Áreas de Interesse</Text>
      <Text style={styles.subtitle}>
        Receba alertas personalizados para locais que são importantes para você.
      </Text>

      {areas.length > 0 ? (
        areas.map(renderAreaItem)
      ) : (
        <View style={styles.noAreasContainer}>
          <MaterialIcons name="location-off" size={FONT_SIZES.xxLarge * 2} color={COLORS.lightText} />
          <Text style={styles.noAreasText}>Nenhuma área de interesse configurada ainda. Adicione uma para começar a receber alertas personalizados!</Text>
        </View>
      )}

      <View style={styles.addAreaButtonContainer}>
        <StyledButton
          title="Adicionar Nova Área"
          onPress={handleAddArea}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
}