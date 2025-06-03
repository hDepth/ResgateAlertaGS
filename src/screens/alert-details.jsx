import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/alert_details';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';
import StyledButton from '../components/StyledButton';

export default function AlertDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { alertData } = route.params || {};

  const defaultAlert = {
    id: 'XXXX',
    title: 'Alerta Não Encontrado',
    type: 'Desconhecido',
    description: 'Nenhuma informação detalhada para este alerta. Ele pode não existir ou ser um alerta antigo.',
    location: 'Desconhecida',
    severity: 'Baixa',
    timestamp: 'N/A',
  };

  const currentAlert = alertData || defaultAlert;

  const getSeverityStyle = (severity) => {
    switch (severity.toLowerCase()) {
      case 'alta': return styles.severityHigh;
      case 'média': return styles.severityMedium;
      case 'baixa': return styles.severityLow;
      default: return {};
    }
  };

  const handleSupport = () => {
    Alert.alert(
      'Apoio Solicitado',
      `Você solicitou apoio para o alerta "${currentAlert.title}". Uma equipe será notificada.`
    );
  };

  // Para a descrição, vamos construir o texto de forma mais controlada
  const descriptionContent = currentAlert.description || `Detalhes: Este é um alerta de teste para ${currentAlert.title}. A situação requer atenção. População local pode precisar de assistência. Monitore as atualizações.`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{currentAlert.title}</Text>
        <Text style={styles.subtitle}>Detalhes completos do evento extremo</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID do Alerta:</Text>
          <Text style={styles.infoValue}>{currentAlert.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo de Evento:</Text>
          <Text style={styles.infoValue}>{currentAlert.type || 'Inundação'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Localização:</Text>
          <Text style={styles.infoValue}>{currentAlert.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Severidade:</Text>
          <Text style={[styles.infoValue, styles.severityText, getSeverityStyle(currentAlert.severity)]}>
            {currentAlert.severity}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reportado em:</Text>
          <Text style={styles.infoValue}>{currentAlert.time || '2025-06-02 14:30'}</Text>
        </View>

        {/* Seção de Descrição Revisada */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Descrição:</Text>
        </View>
        <Text style={styles.descriptionTextOnly}>{descriptionContent}</Text>
        {/* Alternativamente, se você quer a label "Descrição:" e o conteúdo estilizados de forma diferente 
          mas ainda dentro da lógica de "descrição", você poderia fazer:
          
          <View style={styles.descriptionContainer}> // Adicione estilos para descriptionContainer
            <Text style={styles.descriptionLabel}>Descrição:</Text> // Estilo para o label
            <Text style={styles.descriptionValue}>{descriptionContent}</Text> // Estilo para o valor
          </View>

          Ou, se `styles.description` era para o container e você quer manter a estrutura anterior
          de forma mais segura:
        */}
        {/* <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Descrição: </Text> 
          <Text>{descriptionContent}</Text>
        </Text>
        */}


        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={FONT_SIZES.xxLarge * 2} color={COLORS.lightText} />
          <Text style={styles.mapPlaceholderText}>Mapa da Localização do Alerta (Integração Futura)</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Oferecer Ajuda / Apoio"
          onPress={handleSupport}
          color={COLORS.success}
          style={{ marginBottom: SPACING.medium }}
        />
        <StyledButton
          title="Voltar para Alertas"
          onPress={() => navigation.goBack()}
          color={COLORS.borderColor}
          textColor={COLORS.darkText}
        />
      </View>
    </ScrollView>
  );
}