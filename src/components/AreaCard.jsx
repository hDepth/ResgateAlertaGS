import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Para ícones
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme'; // Supondo que você tenha BORDER_RADIUS em Theme.js

// Remova StyledButton daqui se ele for muito específico para botões grandes
// e use TouchableOpacity com ícones para ações menores como editar/excluir.

const AreaCard = ({ area, onDelete, onToggleActive, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.areaName}>{area.name}</Text>
        <Text style={styles.areaCoordinates}>{area.coordinates}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.activeLabel}>Alertas:</Text>
          <Switch
            trackColor={{ false: COLORS.borderColor, true: COLORS.primary }}
            thumbColor={area.active ? COLORS.white : COLORS.lightText}
            ios_backgroundColor={COLORS.borderColor}
            onValueChange={() => onToggleActive(area.id, !area.active)}
            value={area.active}
          />
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => onEdit(area)} style={styles.iconButton}>
            <MaterialIcons name="edit" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(area.id)} style={styles.iconButton}>
            <MaterialIcons name="delete" size={24} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium, // Ex: 10
    padding: SPACING.medium, // Ex: 16
    marginBottom: SPACING.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    marginBottom: SPACING.medium,
  },
  areaName: {
    fontSize: FONT_SIZES.large, // Ex: 20
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.small / 2,
  },
  areaCoordinates: {
    fontSize: FONT_SIZES.medium, // Ex: 16
    color: COLORS.lightText,
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    paddingTop: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    marginRight: SPACING.small,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: SPACING.small, // Ex: 8
    marginLeft: SPACING.medium, // Espaço entre botões de ícone
  },
});

export default AreaCard;