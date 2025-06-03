import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Platform, StyleSheet } from 'react-native'; // Adicione StyleSheet
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps'; // Importar MapView e Marker

// Importe suas constantes de tema (certifique-se de que o caminho está correto)
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

// Importe seus componentes personalizados (certifique-se de que os caminhos estão corretos)
import StyledInput from '../components/StyledInput';
import StyledButton from '../components/StyledButton';
import styles from '../styles/create-alert';

export default function CreateAlertScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [alertType, setAlertType] = useState('');
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState(''); // Estado para o texto da localização
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); // Estado para as coordenadas do mapa
  const [severity, setSeverity] = useState('');

  // Efeito para receber a localização selecionada do LocationPickerScreen
  useEffect(() => {
    if (route.params?.selectedLocation) {
      const { latitude, longitude } = route.params.selectedLocation;
      const formattedLocation = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
      
      setLocationText(formattedLocation); // Atualiza o texto para exibição
      setSelectedCoordinates({ latitude, longitude }); // Atualiza as coordenadas para o mapa

      // Limpa o parâmetro para evitar que seja processado novamente se a tela for focada
      // sem uma nova seleção de localização.
      navigation.setParams({ selectedLocation: undefined });
    }
  }, [route.params?.selectedLocation, navigation]); // navigation adicionado como dependência

  const handleSubmit = () => {
    // Validação dos campos
    if (!alertType || !description || !selectedCoordinates || !severity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para reportar o alerta.');
      return;
    }

    // Lógica para enviar o alerta (aqui você enviaria para sua API/backend)
    console.log('Alerta a ser enviado:', { 
      alertType, 
      description, 
      location: selectedCoordinates, // Envie o objeto de coordenadas
      severity 
    });

    Alert.alert(
      'Alerta Reportado',
      'Seu alerta foi enviado com sucesso e está sendo analisado.'
    );

    // Limpa os campos após o envio
    setAlertType('');
    setDescription('');
    setLocationText('');
    setSelectedCoordinates(null);
    setSeverity('');
    // Opcional: Voltar para a tela inicial ou outra tela após o envio bem-sucedido
    // navigation.goBack(); 
  };

  const handleSelectLocation = () => {
    // Navega para LocationPickerScreen, passando o nome da tela atual para retorno
    navigation.navigate('LocationPickerScreen', { returnTo: 'CreateAlert' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Reportar Novo Alerta</Text>

      <Text style={styles.label}>Tipo de Evento:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={alertType}
          onValueChange={(itemValue) => setAlertType(itemValue)}
          style={styles.picker}
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
      {selectedCoordinates ? (
        <View style={styles.mapPreview}>
          <MapView
            style={styles.smallMap} // Estilo para o mapa pequeno de preview
            region={{
              latitude: selectedCoordinates.latitude,
              longitude: selectedCoordinates.longitude,
              latitudeDelta: 0.005, // Zoom para ver a localização específica
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false} // Desabilita scroll
            zoomEnabled={false} // Desabilita zoom
          >
            <Marker coordinate={selectedCoordinates} />
          </MapView>
          <Text style={styles.mapPreviewText}>Localização Definida:</Text>
          <Text style={styles.mapPreviewText}>{locationText}</Text>
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
          style={styles.picker}
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