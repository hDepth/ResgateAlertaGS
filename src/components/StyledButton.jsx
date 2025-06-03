// src/components/StyledButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, BORDER_RADIUS, SPACING } from '../constants/Theme';

const StyledButton = ({ title, onPress, color, textColor, style, textStyle, disabled }) => {
  const buttonBackgroundColor = color || COLORS.primary;
  const buttonTextColor = textColor || COLORS.inverseText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonBackgroundColor },
        style,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color: buttonTextColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120, // Largura mínima para botões
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: COLORS.borderColor,
  },
});

export default StyledButton;