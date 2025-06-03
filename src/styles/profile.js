// src/styles/Profile.style.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.large,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.large,
    overflow: 'hidden', // Para garantir que a imagem não ultrapasse a borda
  },
  avatarPlaceholder: {
    fontSize: FONT_SIZES.xxLarge * 2,
    color: COLORS.lightText,
  },
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
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.large,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: SPACING.large,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
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
  },
  buttonContainer: {
    marginTop: SPACING.large,
    width: '100%',
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
  },
});

export default styles;