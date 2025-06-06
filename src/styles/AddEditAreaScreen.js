import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/Theme'; // Ajuste o caminho

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.large,
    backgroundColor: COLORS.lightBackground,
    justifyContent: 'space-between', // Para empurrar o botão para baixo
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: BORDER_RADIUS.medium,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  mapInstruction: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
  map: {
    flex: 1, // Faz o mapa ocupar o espaço disponível
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  coordinatesText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
});

export default styles;