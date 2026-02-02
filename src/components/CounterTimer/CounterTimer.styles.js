import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { elevation, radii, spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: elevation.lg,
  },
  counterPill: {
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  counterText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  controlButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    alignItems: 'center',
  },
  controlButtonSecondary: {
    backgroundColor: colors.primaryDark,
  },
  controlButtonOutline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  controlText: {
    color: colors.white,
    fontWeight: '600',
  },
  controlTextOutline: {
    color: colors.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
