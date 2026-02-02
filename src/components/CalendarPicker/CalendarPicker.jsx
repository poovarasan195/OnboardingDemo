import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { styles } from './CalendarPicker.styles';

const pad = (value) => value.toString().padStart(2, '0');

const formatDate = (date, format) => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return format === 'DD/MM/YYYY'
    ? `${day}/${month}/${year}`
    : `${month}/${day}/${year}`;
};

const parseDate = (value, format) => {
  const parts = value.split('/');
  if (parts.length !== 3) {
    return null;
  }
  const [p1, p2, p3] = parts.map((part) => Number(part));
  if (!Number.isFinite(p1) || !Number.isFinite(p2) || !Number.isFinite(p3)) {
    return null;
  }
  const day = format === 'DD/MM/YYYY' ? p1 : p2;
  const month = format === 'DD/MM/YYYY' ? p2 : p1;
  const year = p3;
  if (year < 1900 || year > 2100) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isOutsideBounds = (date, minDate, maxDate) => {
  if (minDate && date < minDate) {
    return true;
  }
  if (maxDate && date > maxDate) {
    return true;
  }
  return false;
};

export const CalendarPicker = ({
  label,
  value,
  onChange,
  format = 'DD/MM/YYYY',
  minDate,
  maxDate,
  helperText,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? formatDate(value, format) : '',
  );
  const [inputError, setInputError] = useState('');
  const [visibleMonth, setVisibleMonth] = useState(
    value ?? new Date(),
  );

  useEffect(() => {
    setInputValue(value ? formatDate(value, format) : '');
    if (value) {
      setVisibleMonth(value);
    }
  }, [value, format]);

  const monthLabel = useMemo(() => {
    const labelDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    return labelDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }, [visibleMonth]);

  const daysGrid = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array.from({ length: firstDay });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
  }, [visibleMonth]);

  const syncInput = (date) => {
    setInputValue(date ? formatDate(date, format) : '');
  };

  const onInputBlur = () => {
    if (inputValue.trim().length === 0) {
      setInputError('');
      onChange(null);
      return;
    }
    const parsed = parseDate(inputValue, format);
    if (!parsed || isOutsideBounds(parsed, minDate, maxDate)) {
      setInputError('Please enter a valid date');
      return;
    }
    setInputError('');
    setVisibleMonth(parsed);
    onChange(parsed);
  };

  const onDayPress = (day) => {
    const next = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      day,
    );
    if (isOutsideBounds(next, minDate, maxDate)) {
      return;
    }
    onChange(next);
    syncInput(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            setInputError('');
          }}
          onBlur={onInputBlur}
          placeholder={format}
          placeholderTextColor={colors.textSecondary}
          style={styles.inputText}
        />
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text style={styles.inputText}>📅</Text>
        </TouchableOpacity>
      </View>
      {inputError ? (
        <Text style={styles.error}>{inputError}</Text>
      ) : errorText ? (
        <Text style={styles.error}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>📅 Select Start Date</Text>
            <View style={styles.monthRow}>
              <TouchableOpacity
                onPress={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
              >
                <Text style={styles.navText}>◀</Text>
              </TouchableOpacity>
              <Text style={styles.monthText}>{monthLabel}</Text>
              <TouchableOpacity
                onPress={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
              >
                <Text style={styles.navText}>▶</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dayNamesRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <Text key={day} style={styles.dayName}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.daysGrid}>
              {daysGrid.map((item, index) => {
                if (typeof item !== 'number') {
                  return <View key={`blank-${index}`} style={styles.dayCell} />;
                }
                const date = new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                  item,
                );
                const disabled = isOutsideBounds(date, minDate, maxDate);
                const isSelected = value ? isSameDay(date, value) : false;
                const isToday = isSameDay(date, new Date());
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => onDayPress(item)}
                    disabled={disabled}
                  >
                    <View
                      style={[
                        styles.dayCell,
                        isSelected && styles.daySelected,
                        isToday && !isSelected && styles.dayToday,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          disabled && styles.dayDisabled,
                          isSelected && styles.daySelectedText,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.helper}>
              Selected: {value ? formatDate(value, format) : 'None'}
            </Text>
            <View style={styles.footerRow}>
              <TouchableOpacity
                style={[styles.footerButton, styles.footerButtonSecondary]}
                onPress={() => {
                  setIsOpen(false);
                  syncInput(value);
                }}
              >
                <Text style={[styles.footerText, styles.footerTextSecondary]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerButton}
                onPress={() => setIsOpen(false)}
              >
                <Text style={styles.footerText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
