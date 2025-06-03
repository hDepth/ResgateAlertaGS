// src/screens/CreateAlertScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Você precisará instalar esta lib: npx expo install @react-native-picker/picker
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/create-alert';
import StyledInput from '../components/StyledInput';
import StyledButton from '../components/StyledButton';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

export default function CreateAlertScreen() {
  const navigation = useNavigation();
  const [alertType, setAlertType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); // Representa a localização selecionada
  const [severity, setSeverity] = useState('');

  const handleSubmit = () => {
    if (!alertType || !description || !location || !severity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para reportar o alerta.');
      return;
    }
    // Lógica para enviar o alerta (API, etc.)
    console.log('Alerta a ser enviado:', { alertType, description, location, severity });
    Alert.alert(
      'Alerta Reportado',
      'Seu alerta foi enviado com sucesso e está sendo analisado.'
    );
    // Limpar formulário
    setAlertType('');
    setDescription('');
    setLocation('');
    setSeverity('');
    // Opcional: Navegar de volta ou para uma tela de confirmação
    navigation.goBack();
  };

  const handleSelectLocation = () => {
    // Ação para abrir um mapa ou serviço de localização
    Alert.alert('Funcionalidade', 'Aqui você integraria a seleção de localização via mapa (ex: react-native-maps)!');
    // Mock de localização para demonstração
    setLocation('Latitude: -23.5505, Longitude: -46.6333 (São Paulo)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={styles.title}>Reportar Novo Alerta</Text>

      <Text style={styles.label}>Tipo de Evento:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={alertType}
          onValueChange={(itemValue) => setAlertType(itemValue)}
          style={{ height: 50, width: '100%', color: COLORS.darkText }}
          itemStyle={Platform.OS === 'ios' ? { fontSize: FONT_SIZES.medium } : {}}
        >
          <Picker.Item label="Selecione o tipo..." value="" />
          <Picker.Item label="Inundação" value="inundacao" />
          <Picker.Item label="Incêndio" value="incendio" />
          <Picker.Item label="Deslizamento" value="deslizamento" />
          <Picker.Item label="Terremoto" value="terremoto" />
          <Picker.Item label="Tempestade" value="tempestade" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Descrição Detalhada:</Text>
      <StyledInput
        style={styles.textArea}
        placeholder="Descreva o evento, impactos e necessidades..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Localização:</Text>
      {location ? (
        <View style={styles.mapPreview}>
          <Text style={styles.mapPreviewText}>Localização Definida:</Text>
          <Text style={styles.mapPreviewText}>{location}</Text>
          <MaterialIcons name="check-circle" size={FONT_SIZES.xxLarge} color={COLORS.success} />
        </View>
      ) : (
        <View style={styles.mapPreview}>
          <MaterialIcons name="map" size={FONT_SIZES.xxLarge * 2} color={COLORS.lightText} />
          <Text style={styles.mapPreviewText}>Toque para selecionar a localização no mapa</Text>
        </View>
      )}
      <StyledButton
        title="Selecionar Localização"
        onPress={handleSelectLocation}
        color={COLORS.primary}
        style={styles.locationButton}
      />

      <Text style={styles.label}>Severidade Estimada:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={severity}
          onValueChange={(itemValue) => setSeverity(itemValue)}
          style={{ height: 50, width: '100%', color: COLORS.darkText }}
          itemStyle={Platform.OS === 'ios' ? { fontSize: FONT_SIZES.medium } : {}}
        >
          <Picker.Item label="Selecione a severidade..." value="" />
          <Picker.Item label="Baixa (Pequenos danos, sem risco imediato)" value="baixa" />
          <Picker.Item label="Média (Danos moderados, atenção necessária)" value="media" />
          <Picker.Item label="Alta (Danos graves, risco à vida ou infraestrutura)" value="alta" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Enviar Alerta"
          onPress={handleSubmit}
          color={COLORS.success}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}