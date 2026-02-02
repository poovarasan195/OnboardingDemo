import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputSuccess: {
    borderColor: colors.secondary,
  },
  helper: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    fontSize: 12,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error,
    fontSize: 12,
  },
  success: {
    marginTop: spacing.xs,
    color: colors.secondary,
    fontSize: 12,
  },
});
