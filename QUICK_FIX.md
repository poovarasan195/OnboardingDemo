# 🚨 QUICK FIX: Firebase Permissions Error

## Error: "Missing or insufficient permissions"

This means Firebase is blocking your app because the security rules are too strict.

---

## ⚡ 3-Minute Fix

### 1. Open Firebase Console
Go to: https://console.firebase.google.com/project/onboardingdemo-b51f2

### 2. Fix Firestore Rules
1. Click **Firestore Database** (left sidebar)
2. Click **Rules** tab
3. **Copy and paste this exactly:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish** button

### 3. Fix Storage Rules
1. Click **Storage** (left sidebar)
2. Click **Rules** tab
3. **Copy and paste this exactly:**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish** button

### 4. Restart Your App
```bash
# Stop the app (press Ctrl+C)
npm start -- --reset-cache

# In another terminal
npx react-native run-android
```

---

## ✅ Test Again

1. Fill the form
2. Click "Complete Onboarding"
3. Should work now! 🎉

---

## 📸 Screenshot Guide

**Firestore Rules Page Should Look Like:**
```
[Firestore Database] → [Rules]

┌─────────────────────────────────────┐
│ rules_version = '2';                │
│ service cloud.firestore {           │
│   match /databases/{database}/...   │
│     match /{document=**} {          │
│       allow read, write: if true;   │
│     }                               │
│   }                                 │
│ }                                   │
└─────────────────────────────────────┘
              [Publish]
```

**Storage Rules Page Should Look Like:**
```
[Storage] → [Rules]

┌─────────────────────────────────────┐
│ rules_version = '2';                │
│ service firebase.storage {          │
│   match /b/{bucket}/o {             │
│     match /{allPaths=**} {          │
│       allow read, write: if true;   │
│     }                               │
│   }                                 │
│ }                                   │
└─────────────────────────────────────┘
              [Publish]
```

---

## ⚠️ Important Notes

### This is for DEMO only!
These rules allow ANYONE to read/write your Firebase.
**DO NOT use in production!**

### For production:
- Add Firebase Authentication
- Use secure rules (examples in `FIREBASE_SETUP.md`)
- Restrict access to authenticated users only

---

## Still Not Working?

### Check these:

1. **Is Firestore created?**
   - Go to Firestore Database
   - If it says "Create database", click it and choose "Test mode"

2. **Is Storage created?**
   - Go to Storage
   - If it says "Get started", click it and choose "Test mode"

3. **Did you click Publish?**
   - After pasting rules, you MUST click the blue "Publish" button

4. **Did you restart the app?**
   - Completely stop and restart React Native
   - Clear cache with: `npm start -- --reset-cache`

5. **Check your internet connection**
   - Firebase needs internet to work

---

## 🆘 Need More Help?

Open `FIREBASE_SETUP.md` for detailed step-by-step instructions with screenshots.
