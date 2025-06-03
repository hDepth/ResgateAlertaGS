// src/styles/AreasOfInterest.style.js
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
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightText,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  areaCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  areaTextContainer: {
    flex: 1,
    marginRight: SPACING.medium,
  },
  areaName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  areaCoordinates: {
    fontSize: FONT_SIZES.small,
    color: COLORS.lightText,
    marginTop: SPACING.small / 2,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  addAreaButtonContainer: {
    marginTop: SPACING.large,
    width: '100%',
  },
  noAreasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  noAreasText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.lightText,
    textAlign: 'center',
  },
});

export default styles;