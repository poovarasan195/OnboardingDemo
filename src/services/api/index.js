import { saveOnboarding } from '../firebase/firestore';
import { uploadFile } from '../firebase/storage';
import { toIsoDate } from '../../utils/formatters';

export const submitOnboarding = async payload => {
  // Upload files to Firebase Storage
  // NOTE: Firebase Storage requires Blaze (paid) plan
  // Using mock uploads for demo purposes
  const uploadedFiles = await Promise.all(
    payload.files.map(async file => {
      try {
        // DEMO MODE: Skip actual file upload (Firebase Storage requires paid plan)
        // Just save file metadata instead
        console.log(`[DEMO MODE] Simulating upload for: ${file.name}`);
        return {
          name: file.name,
          sizeBytes: file.sizeBytes,
          mimeType: file?.mimeType ? file?.mimeType : 'pdf',
          downloadUrl: `demo://files/${file.name}`,
          uploadedAt: new Date().toISOString(),
          isDemo: true,
        };

        /* 
        // REAL UPLOAD CODE (Uncomment when Blaze plan is enabled):
        const storagePath = `Users/${payload.email}/documents/${file.name}`;
        console.log(`Uploading ${file.name} from ${file.uri}`);
        const downloadUrl = await uploadFile(storagePath, file.uri);
        return {
          name: file.name,
          sizeBytes: file.sizeBytes,
          mimeType: file.mimeType,
          downloadUrl: downloadUrl,
          uploadedAt: new Date().toISOString(),
        };
        */
      } catch (error) {
        console.error(`Failed to upload ${file.name}::`, error);
        return {
          name: file.name,
          sizeBytes: file.sizeBytes,
          mimeType: file?.mimeType ? file?.mimeType : 'pdf',
          downloadUrl: 'upload_failed',
          uploadedAt: new Date().toISOString(),
          error: error.message,
        };
      }
    }),
  );

  // Save onboarding data to Firestore
  const firestoreData = {
    Name: payload.name,
    Email: payload.email,
    files: uploadedFiles,
    createdAt: new Date().toISOString(),
  };

  // Only add startDate if it exists (Firestore doesn't accept null)
  if (payload.startDate) {
    firestoreData.startDate = toIsoDate(payload.startDate);
  }

  const recordId = await saveOnboarding(firestoreData);

  return { recordId, files: uploadedFiles };
};
