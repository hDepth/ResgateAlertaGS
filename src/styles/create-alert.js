// src/styles/create-alert.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.large,
    textAlign: 'center',
  },
  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    marginBottom: SPACING.small,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Para Android
    paddingTop: SPACING.medium,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.small,
  },
  buttonContainer: {
    marginTop: SPACING.large,
    width: '100%',
  },
  locationButton: {
    backgroundColor: COLORS.accent,
    marginBottom: SPACING.medium,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  mapPreview: {
    height: 150,
    backgroundColor: COLORS.borderColor,
    borderRadius: BORDER_RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  mapPreviewText: {
    color: COLORS.lightText,
    fontSize: FONT_SIZES.medium,
  },
});

export default styles;