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
  card: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  addText: {
    color: colors.primary,
    fontWeight: '600',
  },
  fileItem: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  fileName: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  fileMeta: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  removeButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.error,
    borderRadius: radii.sm,
  },
  removeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
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
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.primary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  modalListItem: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalFooter: {
    marginTop: spacing.md,
  },
  footerButtonRow: {
    flexDirection: 'row',
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
  footerButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  footerButtonTextSecondary: {
    color: colors.primary,
  },
});
