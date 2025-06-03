import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import StyledButton from '../components/StyledButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/LocationPickerScreen';
import { COLORS } from '../constants/Theme';

export default function LocationPickerScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [marker, setMarker] = useState(null);

  const handleConfirmLocation = () => {
    if (!marker) {
      Alert.alert('Seleção necessária', 'Toque no mapa para escolher a localização.');
      return;
    }

    
    const selectedLocationObject = {
        latitude: marker.latitude,
        longitude: marker.longitude,
    };

    navigation.navigate('App', {
      screen: 'MainTabs',
      params: {
        screen: route.params?.returnTo || 'CreateAlert',
        params: { selectedLocation: selectedLocationObject },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        Toque no mapa para escolher a localização do alerta
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <StyledButton title="Confirmar Localização" onPress={handleConfirmLocation} color={COLORS.primary} />
      <StyledButton title="Cancelar" onPress={() => navigation.goBack()} color={COLORS.danger} style={{ marginTop: 10 }} />
    </View>
  );
}