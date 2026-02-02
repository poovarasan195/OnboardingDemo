import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import { formatBytes } from '../utils/formatters';
import { radii, spacing } from '../constants/layout';

const { width, height } = Dimensions.get('screen');

export const SuccessModal = ({
  visible,
  name,
  userId,
  startDateLabel,
  files,
  onContinue,
  onDownload,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          padding: spacing.lg,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text style={{ fontSize: 32, textAlign: 'center' }}>✅</Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                textAlign: 'center',
                marginTop: spacing.sm,
              }}
            >
              Onboarding Complete!
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: spacing.xs,
                color: colors.textSecondary,
              }}
            >
              Welcome to the platform, {name}!
            </Text>
            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: radii.md,
                padding: spacing.md,
                marginTop: spacing.lg,
              }}
            >
              <Text style={{ fontWeight: '700', marginBottom: spacing.sm }}>
                SUMMARY
              </Text>
              <Text>User ID: {userId}</Text>
              <Text>Start Date: {startDateLabel}</Text>
              <Text>Documents: {files.length} files</Text>
            </View>
            <Text style={{ fontWeight: '700', marginTop: spacing.lg }}>
              File Details:
            </Text>
            {files.map(file => (
              <View
                key={file.id}
                style={{
                  backgroundColor: colors.background,
                  borderRadius: radii.md,
                  padding: spacing.md,
                  marginTop: spacing.sm,
                }}
              >
                <Text style={{ fontWeight: '600' }}>📄 {file.name}</Text>
                <Text style={{ color: colors.textSecondary }}>
                  • Size: {formatBytes(file.sizeBytes)}
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                  • Uploaded: Just now
                </Text>
                <Text style={{ color: colors.secondary }}>• ✅ Verified</Text>
              </View>
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                alignItems: 'center',
                marginTop: spacing.lg,
              }}
              onPress={onContinue}
            >
              <Text style={{ color: colors.white, fontWeight: '700' }}>
                Continue to Dashboard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                alignItems: 'center',
                marginTop: spacing.md,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
              onPress={onDownload}
            >
              <Text style={{ color: colors.primary, fontWeight: '700' }}>
                Download Documents
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
