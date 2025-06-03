import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
  },
  instruction: {
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.small,
    color: COLORS.darkText,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height * 0.65,
    marginBottom: SPACING.medium,
    borderRadius: 10,
  },
});
