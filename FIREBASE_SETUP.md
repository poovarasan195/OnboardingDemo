# Firebase Setup Instructions - FIX PERMISSIONS ERROR

## 🔴 Current Error: "Missing or insufficient permissions"

This error occurs because your Firebase project has security rules that block unauthenticated writes. Since this is a demo app without authentication, we need to temporarily allow public access.

## ⚠️ IMPORTANT: These rules are for DEMO/DEVELOPMENT only!

For production apps, you MUST add authentication and restrict access properly.

---

## Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **onboardingdemo-b51f2**
3. Click **Firestore Database** in the left menu
4. Click the **Rules** tab
5. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write for demo
    // ⚠️ WARNING: Do NOT use in production!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

6. Click **Publish**

---

## Step 2: Update Storage Security Rules

1. Still in Firebase Console
2. Click **Storage** in the left menu
3. Click the **Rules** tab
4. Replace the rules with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read/write for demo
    // ⚠️ WARNING: Do NOT use in production!
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish**

---

## Step 3: Verify Firestore Database is Created

1. Go to **Firestore Database**
2. If you see "Get started" button, click it
3. Choose **Start in test mode** (this will set open rules automatically)
4. Select a location (e.g., **us-central**)
5. Click **Enable**

---

## Step 4: Verify Storage Bucket is Created

1. Go to **Storage**
2. If you see "Get started" button, click it
3. Choose **Start in test mode**
4. Click **Next**
5. Select a location (same as Firestore is recommended)
6. Click **Done**

---

## Step 5: Test Your App

1. Restart your React Native app:
   ```bash
   # Stop the app (Ctrl+C in terminal)
   npm start -- --reset-cache
   
   # In another terminal
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

2. Fill the onboarding form
3. Click "Complete Onboarding"
4. ✅ Should now work without permissions error!

---

## 📊 Verify Data in Firebase Console

After successful submission:

1. **Check Firestore**:
   - Go to Firestore Database
   - You should see a `Users` collection
   - Click to see your document with Name, Email, files, etc.

2. **Check Storage**:
   - Go to Storage
   - You should see `Users/{email}/documents/` folders
   - Your uploaded files should be there

---

## 🔒 For Production (IMPORTANT!)

**DO NOT deploy to production with these open rules!**

### Secure Firestore Rules (with Authentication):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Users/{userId} {
      // Only authenticated users can read/write their own documents
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Secure Storage Rules (with Authentication):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /Users/{userId}/{allPaths=**} {
      // Only authenticated users can upload to their own folder
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🐛 Still Getting Errors?

### Error: "Firestore has not been initialized"
- Make sure you've created the Firestore database (Step 3)
- Restart your app

### Error: "Storage bucket not found"
- Make sure you've created the Storage bucket (Step 4)
- Check that `storageBucket` in `src/services/firebase/config.js` matches your Firebase project

### Error: "Network request failed"
- Check your internet connection
- Make sure your Firebase project is active
- Check that all Firebase services are enabled

### Error: "Invalid API key"
- Verify your Firebase config in `src/services/firebase/config.js`
- Make sure `apiKey`, `projectId`, `storageBucket` all match your Firebase project

---

## ✅ Quick Checklist

Before testing your app, make sure:

- [ ] Firestore Database is created and enabled
- [ ] Storage is created and enabled
- [ ] Firestore rules allow public access (for demo)
- [ ] Storage rules allow public access (for demo)
- [ ] Firebase config in `src/services/firebase/config.js` is correct
- [ ] App is restarted with cache cleared

---

## 📝 Your Current Firebase Config

```javascript
projectId: "onboardingdemo-b51f2"
apiKey: "AIzaSyB3UgW6Azrqo139BM35jwdoPbF_HF-sYDc"
storageBucket: "onboardingdemo-b51f2.firebasestorage.app"
```

Make sure these match your Firebase Console project settings!

---

## Need Help?

1. Take a screenshot of your Firebase Console (Firestore Rules tab)
2. Take a screenshot of your Firebase Console (Storage Rules tab)
3. Share the error message from React Native
