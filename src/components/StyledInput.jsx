// src/components/StyledInput.jsx
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS, FONT_SIZES, BORDER_RADIUS, SPACING } from '../constants/Theme';

const StyledInput = ({ style, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={COLORS.lightText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: SPACING.medium,
  },
  input: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: BORDER_RADIUS.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkText,
    backgroundColor: COLORS.white,
  },
});

export default StyledInput;