import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import { firebaseApp } from './config';

const storage = getStorage(firebaseApp);

// Helper function to convert file URI to blob using XMLHttpRequest (React Native compatible)
const uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('Failed to read file'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export const uploadFile = async (path, fileUri) => {
  try {
    const storageRef = ref(storage, path);

    // Convert file URI to blob (React Native compatible)
    const blob = await uriToBlob(fileUri);

    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get and return the download URL
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const uploadPlaceholder = async (path, contents) => {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, contents, 'raw');
  return getDownloadURL(storageRef);
};
