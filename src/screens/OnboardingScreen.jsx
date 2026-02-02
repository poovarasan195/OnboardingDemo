import { useMemo, useState, useRef } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CounterTimer } from '../components/CounterTimer/CounterTimer';
import { TextInput } from '../components/TextInput/TextInput';
import { CalendarPicker } from '../components/CalendarPicker/CalendarPicker';
import { FilePicker } from '../components/FilePicker/FilePicker';
import { ProgressDots } from '../components/common/ProgressDots';
import { colors } from '../constants/colors';
import { radii, spacing } from '../constants/layout';
import { useOnboarding } from '../context/OnboardingContext';
import { submitOnboarding } from '../services/api';
import { toIsoDate } from '../utils/formatters';
import { isEmail, isRequired } from '../utils/validators';
import { SuccessModal } from './SuccessModal';

export const OnboardingScreen = () => {
  const { data, setName, setEmail, setStartDate, setFiles, reset } =
    useOnboarding();
  const [errors, setErrors] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(0);
  const [submittedSnapshot, setSubmittedSnapshot] = useState(data);
  const uploadIntervalRef = useRef(null);
  const isSubmittingRef = useRef(false);

  const validationErrors = useMemo(() => {
    const list = [];
    if (!isRequired(data.name)) {
      list.push('Full name is required');
    }
    if (!isRequired(data.email) || !isEmail(data.email)) {
      list.push('Email is invalid');
    }
    if (!data.startDate) {
      list.push('Start date is required');
    } else if (data.startDate <= new Date()) {
      list.push('Please select a future date');
    }
    if (data.files.length === 0) {
      list.push('At least 1 document needed');
    }
    return list;
  }, [data]);

  const handleSubmit = async () => {
    // Prevent multiple simultaneous submissions
    if (isSubmittingRef.current) {
      console.log('Submission already in progress, ignoring...');
      return;
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any existing interval
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }

    isSubmittingRef.current = true;
    setErrors([]);
    setNetworkError(false);
    setSubmittedSnapshot({ ...data }); // Create a copy of data
    setIsUploading(true);
    setIsSubmitting(false);
    setUploadingIndex(0);

    const filesLength = data.files.length;

    uploadIntervalRef.current = setInterval(() => {
      setUploadingIndex(prev =>
        Math.min(prev + 1, Math.max(filesLength - 1, 0)),
      );
    }, 600);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsUploading(false);
      setIsSubmitting(true);

      console.log('Submitting onboarding with files:', filesLength);
      const result = await submitOnboarding(data);
      console.log('Onboarding submitted successfully:', result.recordId);

      setUserId(result.recordId);
      setIsSubmitting(false);
      
      // Clear interval before showing success
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
        uploadIntervalRef.current = null;
      }

      setTimeout(() => {
        setSuccessVisible(true);
        reset();
        isSubmittingRef.current = false;
      }, 300);
    } catch (error) {
      console.error('Onboarding submission error:', error);
      setNetworkError(true);
      isSubmittingRef.current = false;
    } finally {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
        uploadIntervalRef.current = null;
      }
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.xl,
            borderBottomLeftRadius: radii.lg,
            borderBottomRightRadius: radii.lg,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 22,
              fontWeight: '700',
            }}
          >
            🚀 Welcome to Onboarding Platform
          </Text>
          <Text style={{ color: colors.white, marginTop: spacing.xs }}>
            Complete your onboarding in 5 steps
          </Text>
        </View>

        <View style={{ marginTop: -spacing.lg, padding: spacing.lg }}>
          <CounterTimer targetNumber={100} durationSec={5} />

          <View style={{ marginTop: spacing.lg }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginBottom: spacing.md,
              }}
            >
              📝 Personal Information
            </Text>
            <TextInput
              label="Full Name *"
              placeholder="John Doe"
              value={data.name}
              onChangeText={setName}
              helperText="Enter your full legal name"
              validators={[
                { type: 'required', message: 'Name is required' },
                { type: 'minLength', value: 2, message: 'Min 2 characters' },
              ]}
            />
            <TextInput
              label="Email Address *"
              placeholder="john.doe@example.com"
              value={data.email}
              onChangeText={setEmail}
              keyboardType="email-address"
              helperText="✓ Valid email format"
              autoCapitalize={true}
              validators={[
                { type: 'required', message: 'Email is required' },
                {
                  type: 'regex',
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email is invalid',
                },
              ]}
            />
            <CalendarPicker
              label="📅 Select Start Date"
              value={data.startDate}
              onChange={setStartDate}
              format="DD/MM/YYYY"
              helperText="Please select a future date"
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            />
            <FilePicker
              label="📎 Upload Documents"
              value={data.files}
              onChange={setFiles}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.lg,
              }}
            >
              <Text style={{ color: colors.textSecondary }}>
                Progress: {Math.min(data.files.length + 2, 5)}/5
              </Text>
              <ProgressDots
                total={5}
                current={Math.min(data.files.length + 2, 5)}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  isSubmitting || isUploading
                    ? colors.textSecondary
                    : colors.primary,
                borderRadius: radii.pill,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 8,
              }}
              onPress={handleSubmit}
              disabled={isSubmitting || isUploading}
              activeOpacity={0.8}
            >
              <Text
                style={{ color: colors.white, fontWeight: '700', fontSize: 16 }}
              >
                {isSubmitting || isUploading
                  ? 'Submitting...'
                  : 'Complete Onboarding'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={errors.length > 0} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text style={{ fontWeight: '700', fontSize: 18 }}>
              ⚠️ Validation Error
            </Text>
            <View style={{ marginTop: spacing.md }}>
              {errors.map(item => (
                <Text key={item} style={{ marginBottom: spacing.xs }}>
                  • {item}
                </Text>
              ))}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                alignItems: 'center',
                marginTop: spacing.lg,
              }}
              onPress={() => setErrors([])}
            >
              <Text style={{ color: colors.white, fontWeight: '700' }}>
                Back to Form
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={networkError} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text style={{ fontWeight: '700', fontSize: 18 }}>
              📶 Connection Lost
            </Text>
            <Text style={{ marginTop: spacing.sm }}>
              We couldn't submit your information.
            </Text>
            <Text style={{ marginTop: spacing.xs }}>
              Please check your connection and try again.
            </Text>
            <Text style={{ marginTop: spacing.xs }}>
              Your data is saved locally and will be submitted when you're back
              online.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                alignItems: 'center',
                marginTop: spacing.lg,
              }}
              onPress={() => {
                setNetworkError(false);
                setTimeout(() => {
                  handleSubmit();
                }, 100);
              }}
            >
              <Text style={{ color: colors.white, fontWeight: '700' }}>
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                borderRadius: radii.pill,
                paddingVertical: spacing.sm,
                alignItems: 'center',
                marginTop: spacing.sm,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
              onPress={() => setNetworkError(false)}
            >
              <Text style={{ color: colors.primary, fontWeight: '700' }}>
                Save Draft & Exit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isUploading} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text style={{ fontWeight: '700', fontSize: 18 }}>
              Uploading files...
            </Text>
            <Text style={{ marginTop: spacing.sm }}>
              Uploading documents (
              {Math.min(uploadingIndex + 1, data.files.length)}/
              {data.files.length || 1})
            </Text>
            {data.files.map((file, index) => (
              <View key={file.id} style={{ marginTop: spacing.sm }}>
                <Text>{file.name}</Text>
                <View
                  style={{
                    height: 8,
                    backgroundColor: colors.border,
                    borderRadius: 4,
                    marginTop: spacing.xs,
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      width:
                        index <= uploadingIndex
                          ? '70%'
                          : index === uploadingIndex + 1
                          ? '35%'
                          : '0%',
                      backgroundColor: colors.primary,
                    }}
                  />
                </View>
              </View>
            ))}
            <Text
              style={{ marginTop: spacing.md, color: colors.textSecondary }}
            >
              Please don't close the app...
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isSubmitting && !isUploading}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.overlay,
            justifyContent: 'center',
            padding: spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: radii.lg,
              padding: spacing.lg,
            }}
          >
            <Text style={{ fontWeight: '700', fontSize: 18 }}>
              Submitting your information
            </Text>
            <View style={{ marginTop: spacing.md }}>
              {[
                { label: 'Validating data', done: true },
                { label: 'Creating account', done: true },
                { label: 'Uploading files', done: isUploading },
                { label: 'Finalizing', done: !isUploading },
              ].map(step => (
                <Text key={step.label} style={{ marginBottom: spacing.xs }}>
                  {step.done ? '✓' : '○'} {step.label}
                </Text>
              ))}
            </View>
            <Text
              style={{ marginTop: spacing.sm, color: colors.textSecondary }}
            >
              This will take just a moment...
            </Text>
          </View>
        </View>
      </Modal>

      <SuccessModal
        visible={successVisible}
        name={submittedSnapshot.name || 'John'}
        userId={userId || 'USR-789ABC'}
        startDateLabel={
          submittedSnapshot.startDate
            ? toIsoDate(submittedSnapshot.startDate)
            : '--'
        }
        files={submittedSnapshot.files}
        onContinue={() => {
          setSuccessVisible(false);
          setUserId('');
        }}
        onDownload={() => {
          setSuccessVisible(false);
          setUserId('');
        }}
      />
    </SafeAreaView>
  );
};
