
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.medium,
    paddingTop: SPACING.large,
  },
  headerContainer: {
    marginBottom: SPACING.large,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.lightText,
    textAlign: 'center',
    paddingHorizontal: SPACING.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginTop: SPACING.large,
    marginBottom: SPACING.medium,
    marginLeft: SPACING.small,
  },
  alertCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: SPACING.medium,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  alertLocation: {
    fontSize: FONT_SIZES.small,
    color: COLORS.lightText,
    marginTop: SPACING.small / 2,
  },
  alertTime: {
    fontSize: FONT_SIZES.small,
    color: COLORS.lightText,
    textAlign: 'right',
  },
  alertSeverityHigh: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  alertSeverityMedium: {
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  alertSeverityLow: {
    color: COLORS.success,
    fontWeight: 'bold',
  },
  seeAllButtonContainer: {
    marginTop: SPACING.medium,
    alignItems: 'center',
  },
  noAlertsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  noAlertsText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.lightText,
    textAlign: 'center',
  },
});

export default styles;