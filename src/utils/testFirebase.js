/**
 * Firebase Connection Test Utility
 *
 * This file helps test if Firebase is properly configured and accessible.
 * Run this to verify Firebase before testing the full app.
 */

import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../services/firebase/config";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

/**
 * Test Firestore connection and permissions
 */
export const testFirestore = async () => {
  try {
    console.log(" Testing Firestore...");

    // Try to write a test document
    const testData = {
      test: true,
      message: "Firebase connection test",
      timestamp: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "ConnectionTest"), testData);
    console.log(" Firestore WRITE successful! Document ID:", docRef.id);

    // Try to read the document
    const snapshot = await getDocs(collection(db, "ConnectionTest"));
    console.log(
      " Firestore READ successful! Found",
      snapshot.size,
      "documents",
    );

    return {
      success: true,
      message: "Firestore is working correctly!",
      documentId: docRef.id,
    };
  } catch (error) {
    console.error(" Firestore test FAILED:", error.code, error.message);

    if (error.code === "permission-denied") {
      return {
        success: false,
        error: "PERMISSION_DENIED",
        message:
          "Firestore rules are blocking access. Please update rules in Firebase Console.",
        solution:
          "Open Firebase Console → Firestore → Rules → Set: allow read, write: if true;",
      };
    }

    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
};

/**
 * Test Storage connection and permissions
 */
export const testStorage = async () => {
  try {
    console.log(" Testing Storage...");

    // Try to upload a test file
    const testPath = "ConnectionTest/test.txt";
    const testContent = `Firebase Storage test at ${new Date().toISOString()}`;
    const storageRef = ref(storage, testPath);

    await uploadString(storageRef, testContent, "raw");
    console.log(" Storage WRITE successful!");

    // Try to get download URL
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Storage READ successful! URL:", downloadUrl);

    return {
      success: true,
      message: "Storage is working correctly!",
      downloadUrl: downloadUrl,
    };
  } catch (error) {
    console.error(" Storage test FAILED:", error.code, error.message);

    if (error.code === "storage/unauthorized") {
      return {
        success: false,
        error: "PERMISSION_DENIED",
        message:
          "Storage rules are blocking access. Please update rules in Firebase Console.",
        solution:
          "Open Firebase Console → Storage → Rules → Set: allow read, write: if true;",
      };
    }

    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
};

/**
 * Run all Firebase tests
 */
export const runAllFirebaseTests = async () => {
  console.log("\n ========== FIREBASE CONNECTION TEST ==========\n");

  console.log(" Configuration:");
  console.log("  Project ID:", firebaseApp.options.projectId);
  console.log("  Storage Bucket:", firebaseApp.options.storageBucket);
  console.log("  Auth Domain:", firebaseApp.options.authDomain);
  console.log("\n");

  const results = {
    firestore: null,
    storage: null,
    overall: false,
  };

  // Test Firestore
  results.firestore = await testFirestore();
  console.log("\n");

  // Test Storage
  results.storage = await testStorage();
  console.log("\n");

  // Overall result
  results.overall = results.firestore.success && results.storage.success;

  if (results.overall) {
    console.log(" ========== ALL TESTS PASSED ==========");
    console.log("Firebase is properly configured and accessible!");
    console.log(" Your app should work correctly now.");
  } else {
    console.log(" ========== SOME TESTS FAILED ==========");

    if (!results.firestore.success) {
      console.log("\n Firestore Issue:");
      console.log("   Error:", results.firestore.error);
      console.log("   Message:", results.firestore.message);
      if (results.firestore.solution) {
        console.log("   Solution:", results.firestore.solution);
      }
    }

    if (!results.storage.success) {
      console.log("\n Storage Issue:");
      console.log("   Error:", results.storage.error);
      console.log("   Message:", results.storage.message);
      if (results.storage.solution) {
        console.log("   Solution:", results.storage.solution);
      }
    }

    console.log("\n📖 See FIREBASE_VERIFY.md for detailed setup instructions");
  }

  console.log("\n==============================================\n");

  return results;
};

// Export individual test functions
export default {
  testFirestore,
  testStorage,
  runAllFirebaseTests,
};
