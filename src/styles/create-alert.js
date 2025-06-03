// src/styles/create-alert.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: SPACING.large * 2, // Adicione padding na parte inferior
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    marginBottom: SPACING.small,
    marginTop: SPACING.medium,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: SPACING.small,
    marginBottom: SPACING.medium,
    overflow: 'hidden', // Garante que o Picker respeite o borderRadius
    backgroundColor: COLORS.white,
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.darkText,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Para que o texto comece no topo em Android
    padding: SPACING.small,
  },
  mapPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightBackground,
    borderRadius: SPACING.small,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  smallMap: {
    width: '100%',
    height: 180, // Altura do mapa de preview
    borderRadius: SPACING.small,
    marginBottom: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  mapPreviewText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    marginTop: SPACING.small,
    textAlign: 'center',
  },
  locationButton: {
    marginBottom: SPACING.large,
  },
  buttonContainer: {
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
  },
  submitButton: {
    // Estilos específicos para o botão de envio, se necessário
  },
});

export default styles;