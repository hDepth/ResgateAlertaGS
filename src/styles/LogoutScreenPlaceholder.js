// src/styles/Logout.style.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightText,
    textAlign: 'center',
    marginBottom: SPACING.xLarge,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: SPACING.medium,
  },
  confirmButton: {
    backgroundColor: COLORS.danger,
  },
  cancelButton: {
    backgroundColor: COLORS.borderColor,
  },
  cancelButtonText: {
    color: COLORS.darkText,
  },
});

export default styles;