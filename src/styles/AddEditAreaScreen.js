import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
    color: COLORS.darkText,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    padding: SPACING.small,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.medium,
  },
});
