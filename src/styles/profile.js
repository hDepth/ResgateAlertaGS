// src/styles/profile.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow para ScrollView contentContainerStyle
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center', // Centraliza conteúdo verticalmente se o ScrollView for pequeno
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
  },
  loadingText: {
    marginTop: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
  },
  errorText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.medium,
    marginBottom: SPACING.large,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.large,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    fontSize: FONT_SIZES.xxLarge * 2,
    color: COLORS.lightText,
  },
  // Se você usar uma imagem de avatar, adicione um estilo para ela:
  // avatar: {
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 60, // Para garantir que a imagem seja redonda
  // },
  name: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.small,
  },
  email: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightText,
    marginBottom: SPACING.large,
  },
  // Estes estilos são comentados no JSX, mas podem ser mantidos aqui caso você os use futuramente
  // infoCard: {
  //   backgroundColor: COLORS.white,
  //   borderRadius: BORDER_RADIUS.medium,
  //   padding: SPACING.large,
  //   width: '100%',
  //   elevation: 2,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 1.41,
  //   marginBottom: SPACING.large,
  // },
  // infoRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingVertical: SPACING.small,
  //   borderBottomWidth: 1,
  //   borderBottomColor: COLORS.borderColor,
  // },
  // infoLabel: {
  //   fontSize: FONT_SIZES.medium,
  //   fontWeight: 'bold',
  //   color: COLORS.darkText,
  // },
  // infoValue: {
  //   fontSize: FONT_SIZES.medium,
  //   color: COLORS.lightText,
  // },
  buttonContainer: {
    marginTop: SPACING.large,
    width: '100%',
    alignItems: 'center', // Centraliza os botões
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
  },
});

export default styles;