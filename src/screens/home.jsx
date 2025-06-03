// src/screens/HomeScreen.jsx
import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/home';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';
import StyledButton from '../components/StyledButton';

// Dados de alerta de exemplo
const MOCKED_ALERTS = [
  { id: '1', title: 'Inundação na Zona Sul', location: 'Av. Brasil, 1234', time: '10 min atrás', severity: 'Alta', icon: 'flood' },
  { id: '2', title: 'Incêndio Florestal - Serra', location: 'Parque Nacional', time: '30 min atrás', severity: 'Alta', icon: 'local-fire-department' },
  { id: '3', title: 'Deslizamento de Terra', location: 'Morro da Paz', time: '1 hora atrás', severity: 'Média', icon: 'landslide' },
  { id: '4', title: 'Tempestade Forte', location: 'Centro da Cidade', time: '2 horas atrás', severity: 'Média', icon: 'thunderstorm' },
  { id: '5', title: 'Queda de Energia', location: 'Bairro Novo', time: '4 horas atrás', severity: 'Baixa', icon: 'power-off' },
  { id: '6', title: 'Vento Forte', location: 'Região Litorânea', time: 'Ontem', severity: 'Baixa', icon: 'wind-power' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  // Função para renderizar cada item da lista de alertas
  const renderAlertItem = ({ item }) => {
    const getSeverityStyle = (severity) => {
      switch (severity) {
        case 'Alta': return styles.alertSeverityHigh;
        case 'Média': return styles.alertSeverityMedium;
        case 'Baixa': return styles.alertSeverityLow;
        default: return {};
      }
    };

    const getAlertIcon = (icon) => {
      switch (icon) {
        case 'flood': return 'flood';
        case 'local-fire-department': return 'local-fire-department';
        case 'landslide': return 'landslide';
        case 'thunderstorm': return 'thunderstorm';
        case 'power-off': return 'power-off';
        case 'wind-power': return 'wind-power';
        default: return 'warning'; 
      }
    };

    return (
      <TouchableOpacity
        style={styles.alertCard}
        onPress={() => navigation.navigate('AlertDetails', { alertId: item.id, alertData: item })}
      >
        <MaterialIcons
          name={getAlertIcon(item.icon)}
          size={FONT_SIZES.xLarge}
          color={getSeverityStyle(item.severity).color || COLORS.lightText}
          style={styles.alertIcon}
        />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertLocation}>{item.location}</Text>
          <Text style={[styles.alertSeverityText, getSeverityStyle(item.severity)]}>
            Severidade: {item.severity}
          </Text>
        </View>
        <Text style={styles.alertTime}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>
          Monitore eventos extremos e receba alertas para sua segurança e de sua comunidade.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Alertas Recentes</Text>
      {MOCKED_ALERTS.length > 0 ? (
        <FlatList
          data={MOCKED_ALERTS}
          renderItem={renderAlertItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SPACING.large }} // Garante que a lista não seja cortada
        />
      ) : (
        <View style={styles.noAlertsContainer}>
          <MaterialIcons name="notifications-off" size={FONT_SIZES.xxLarge * 2} color={COLORS.lightText} />
          <Text style={styles.noAlertsText}>Nenhum alerta recente no momento. Mantenha-se seguro!</Text>
        </View>
      )}

      {/* Botão para reportar alerta, fora da lista */}
      <View style={styles.seeAllButtonContainer}>
        <StyledButton
          title="Reportar Novo Alerta"
          onPress={() => navigation.navigate('CreateAlert')}
          color={COLORS.accent}
          style={{ width: '80%' }}
        />
      </View>
    </View>
  );
}