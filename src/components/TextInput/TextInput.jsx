import { useMemo, useState } from 'react';
import { Text, TextInput as RNTextInput, View } from 'react-native';
import { styles } from './TextInput.styles';
const runValidation = (value, validators) => {
  if (!validators || validators.length === 0) {
    return '';
  }

  for (const rule of validators) {
    if (rule.type === 'required' && value.trim().length === 0) {
      return rule.message;
    }
    if (rule.type === 'minLength' && value.trim().length < rule.value) {
      return rule.message;
    }
    if (rule.type === 'maxLength' && value.trim().length > rule.value) {
      return rule.message;
    }
    if (rule.type === 'regex' && !rule.value.test(value.trim())) {
      return rule.message;
    }
  }
  return '';
};

export const TextInput = ({
  label,
  value,
  placeholder,
  helperText,
  validators,
  keyboardType,
  disabled,
  onChangeText,
  autoCapitalize,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const errorMessage = useMemo(
    () => runValidation(value, validators),
    [value, validators],
  );

  const showError = touched && errorMessage.length > 0;
  const showSuccess = touched && errorMessage.length === 0 && value.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        value={value}
        placeholder={placeholder}
        editable={!disabled}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ? 'none' : 'words'}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          showError && styles.inputError,
          showSuccess && styles.inputSuccess,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setTouched(true);
        }}
        onChangeText={onChangeText}
      />
      {showError ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : showSuccess ? (
        <Text style={styles.success}>Valid format</Text>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
};
