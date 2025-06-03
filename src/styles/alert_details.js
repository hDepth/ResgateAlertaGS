// src/styles/AlertDetails.style.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.large,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightText,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
    paddingBottom: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  infoLabel: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  infoValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightText,
    flexShrink: 1, // Permite que o texto quebre linha
    textAlign: 'right',
  },
  description: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    marginTop: SPACING.medium,
    lineHeight: FONT_SIZES.medium * 1.5,
  },
  // Estilos de severidade
  severityText: {
    fontWeight: 'bold',
  },
  severityLow: {
    color: COLORS.success,
  },
  severityMedium: {
    color: COLORS.accent,
  },
  severityHigh: {
    color: COLORS.danger,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: COLORS.borderColor,
    borderRadius: BORDER_RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  mapPlaceholderText: {
    color: COLORS.lightText,
    fontSize: FONT_SIZES.medium,
  },
  buttonContainer: {
    marginTop: SPACING.large,
  },
});

export default styles;