import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { radii, spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputRow: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textSecondary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  navText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  dayName: {
    width: 32,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dayCell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  dayDisabled: {
    color: colors.muted,
  },
  daySelected: {
    backgroundColor: colors.primary,
  },
  daySelectedText: {
    color: colors.white,
    fontWeight: '700',
  },
  dayToday: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  footerButton: {
    flex: 1,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  footerButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  footerText: {
    color: colors.white,
    fontWeight: '600',
  },
  footerTextSecondary: {
    color: colors.primary,
  },
});
