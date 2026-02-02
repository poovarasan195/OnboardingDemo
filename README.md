# Onboarding Platform - React Native App

A production-ready mobile onboarding application built with React Native, featuring reusable components, Firebase backend integration, and thoughtful UX design.

## 📱 Demo

**APK Download**: [Coming Soon - Upload to Google Drive]

**Demo Video**: [Optional - 30-90s walkthrough]

## 🎯 Project Overview

This app demonstrates a complete onboarding workflow with:
- 4 reusable components (CounterTimer, TextInput, CalendarPicker, FilePicker)
- Firebase backend integration (Firestore + Storage)
- Real-time validation and error handling
- Document upload with native file picker
- Beautiful, accessible UI following iOS design guidelines

## 🛠 Tech Stack

### Core Technologies
- **React Native**: 0.82.1
- **React**: 19.1.1
- **JavaScript**: ES6+ (converted from TypeScript for broader compatibility)
- **Node**: >=20

### Firebase Stack
- **firebase**: ^10.12.5
  - Firestore: Real-time database for user data
  - Storage: File storage for uploaded documents
  
### Key Dependencies
- **react-native-document-picker**: ^9.1.1 - Native document/file selection
- **react-native-safe-area-context**: ^5.5.2 - Safe area handling for notch devices

### Development Tools
- **ESLint**: Code quality and consistency
- **Jest**: Testing framework
- **Metro**: React Native bundler

## 🏗 Architecture

```
onboarding-platform/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CounterTimer/    # Animated counter with controls
│   │   ├── TextInput/       # Validated text input
│   │   ├── CalendarPicker/  # Date picker with calendar modal
│   │   ├── FilePicker/      # Document picker with validation
│   │   └── common/          # Shared components (ProgressDots)
│   ├── screens/             # App screens
│   │   ├── OnboardingScreen.jsx  # Main onboarding flow
│   │   └── SuccessModal.jsx      # Success confirmation
│   ├── services/            # Business logic layer
│   │   ├── firebase/        # Firebase integration
│   │   │   ├── config.js         # Firebase configuration
│   │   │   ├── firestore.js      # Database operations
│   │   │   └── storage.js        # File upload operations
│   │   └── api/             # API client wrapper
│   │       └── index.js          # Onboarding submission logic
│   ├── context/             # State management
│   │   └── OnboardingContext.jsx # Global onboarding state
│   ├── hooks/               # Custom React hooks
│   │   └── useCounterAnimation.js # Counter animation logic
│   ├── utils/               # Utility functions
│   │   ├── validators.js         # Input validation
│   │   ├── formatters.js         # Data formatting
│   │   └── fileUtils.js          # File utilities
│   └── constants/           # App constants
│       ├── colors.js             # Color palette
│       └── layout.js             # Spacing & layout constants
├── android/                 # Android native code
├── ios/                     # iOS native code
└── App.jsx                  # App entry point
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                 │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ OnboardingScreen │  │  SuccessModal    │        │
│  └────────┬─────────┘  └──────────────────┘        │
│           │                                          │
│  ┌────────▼────────────────────────────┐           │
│  │  Reusable Component Library         │           │
│  │  • CounterTimer  • CalendarPicker   │           │
│  │  • TextInput     • FilePicker       │           │
│  └────────┬────────────────────────────┘           │
└───────────┼──────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────┐
│                  State Management Layer               │
│  ┌──────────────────────────────────────┐           │
│  │  OnboardingContext (React Context)   │           │
│  │  • Form data  • File state           │           │
│  └──────────────────────────────────────┘           │
└───────────┬──────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────┐
│                    Business Logic Layer               │
│  ┌──────────────────────────────────────┐           │
│  │  API Service Layer                   │           │
│  │  • Validation  • Error handling      │           │
│  │  • File upload • Data submission     │           │
│  └────────┬─────────────────────────────┘           │
└───────────┼──────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────┐
│                    Firebase Backend                   │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │   Firestore DB   │  │  Storage Bucket  │         │
│  │  (Users/*)       │  │  (Users/{email}) │         │
│  └──────────────────┘  └──────────────────┘         │
└──────────────────────────────────────────────────────┘
```

## 🔥 Backend Choice: Firebase

### Why Firebase?

I chose **Firebase (Option C)** for the following reasons:

1. **Production-Ready**: Firebase is a battle-tested, scalable platform used by millions of apps
2. **Real-time Capabilities**: Built-in real-time sync and offline support
3. **Integrated Services**: Combines database (Firestore) and file storage seamlessly
4. **Security**: Built-in authentication and security rules
5. **Free Tier**: Generous free tier for development and testing
6. **Easy Setup**: Simple configuration with mobile SDKs
7. **No Server Management**: Fully managed backend infrastructure

### Firebase Configuration

```javascript
{
  projectId: "onboardingdemo-b51f2",
  apiKey: "AIzaSyB3UgW6Azrqo139BM35jwdoPbF_HF-sYDc",
  authDomain: "onboardingdemo-b51f2.firebaseapp.com",
  storageBucket: "onboardingdemo-b51f2.firebasestorage.app"
}
```

## 📡 API Contract

### Endpoint: Submit Onboarding

**Function**: `submitOnboarding(payload)`

**Request Payload**:
```javascript
{
  name: string,           // User's full name
  email: string,          // User's email address
  startDate: Date | null, // Selected start date
  files: Array<{          // Uploaded documents
    id: string,
    name: string,
    sizeBytes: number,
    mimeType: string,
    uri: string
  }>
}
```

**Response**:
```javascript
{
  recordId: string,       // Firestore document ID
  files: Array<{          // Uploaded files with URLs
    name: string,
    sizeBytes: number,
    mimeType: string,
    downloadUrl: string,
    uploadedAt: string
  }>
}
```

### Firestore Data Model

**Collection**: `Users`

**Document Structure**:
```json
{
  "Name": "John Doe",
  "Email": "john.doe@example.com",
  "startDate": "2026-03-15",
  "files": [
    {
      "name": "ID_Card.jpg",
      "sizeBytes": 2516582,
      "mimeType": "image/jpeg",
      "downloadUrl": "https://firebasestorage.googleapis.com/...",
      "uploadedAt": "2026-02-01T10:30:00.000Z"
    }
  ],
  "createdAt": "2026-02-01T10:30:00.000Z"
}
```

### Firebase Storage Structure

```
Users/
  {email}/
    documents/
      ID_Card.jpg
      Passport.pdf
      Avatar.png
```

## 🚀 Setup and Installation

### Prerequisites

- **Node.js**: >= 20.x
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **Java 11** (for Android)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure Firebase** (if using your own project):
   - Update `src/services/firebase/config.js` with your Firebase config
   - Add `google-services.json` to `android/app/`
   - Add `GoogleService-Info.plist` to `ios/demo/`

### Running the App

#### Start Metro Bundler:
```bash
npm start
```

#### Run on Android:
```bash
npm run android
```

#### Run on iOS (macOS only):
```bash
npm run ios
```

## 📦 Building APK

### Debug APK

```bash
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (Signed)

1. **Generate signing key** (first time only):
   ```bash
   keytool -genkeypair -v -keystore demo-release-key.keystore \
     -alias demo-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in** `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file('demo-release-key.keystore')
           storePassword 'your-password'
           keyAlias 'demo-key-alias'
           keyPassword 'your-password'
       }
   }
   ```

3. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

Output: `android/app/build/outputs/apk/release/app-release.apk`

## 🔐 Environment Variables

The app uses Firebase configuration embedded in `src/services/firebase/config.js`.

**For production**, use environment variables:

```bash
# Create .env file (not committed to git)
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

**Note**: DO NOT commit real API keys to version control. Use `.env` files and `.gitignore`.

## 📚 Third-Party Libraries

### Production Dependencies

| Library | Version | Purpose | Why? |
|---------|---------|---------|------|
| `firebase` | ^10.12.5 | Backend services | Firestore database + file storage, production-ready, scalable |
| `react-native-document-picker` | ^9.1.1 | Native file selection | Best-in-class native file picker with excellent cross-platform support |
| `react-native-safe-area-context` | ^5.5.2 | Safe area handling | Essential for notch/cutout devices, recommended by React Native |

### Component Design Decisions

1. **CounterTimer**:
   - Uses `requestAnimationFrame` for smooth 60fps animation
   - No external animation library needed for simple counter
   - Lightweight and performant

2. **TextInput**:
   - Built on React Native's native TextInput
   - Custom validation system for flexibility
   - Controlled component pattern for predictable state

3. **CalendarPicker**:
   - Custom implementation for full control over UX
   - Modal-based for mobile-first design
   - Supports both manual entry and visual selection

4. **FilePicker**:
   - Uses `react-native-document-picker` for native file access
   - Mock files for testing without device storage
   - Validates file type, size, and count

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Manual Testing Checklist

- [ ] CounterTimer: Start/Stop/Reset/Restart all work
- [ ] TextInput: Validation works for name, email
- [ ] CalendarPicker: Can select future dates, manual entry works
- [ ] FilePicker: Can select files from device, shows in list
- [ ] Form submission: Validates all fields before submit
- [ ] File upload: Files upload to Firebase Storage
- [ ] Data save: Data saves to Firestore
- [ ] Success modal: Shows uploaded file details
- [ ] Error handling: Network errors show retry option
- [ ] Safe area: Works on devices with notches

## 🐛 Known Limitations & Trade-offs

### Current Limitations

1. **No Authentication**: App doesn't require login (as per assignment requirements)
2. **Mock Files**: FilePicker includes mock files for testing (in addition to real picker)
3. **No Offline Sync**: Firebase offline persistence not enabled
4. **Basic Progress Indicator**: Upload progress is simulated, not real-time from Firebase
5. **No Image Preview**: Selected images don't show thumbnails

### Architecture Trade-offs

1. **JavaScript vs TypeScript**:
   - **Chose**: JavaScript
   - **Why**: Broader compatibility, faster development, assignment allows both
   - **Trade-off**: Less type safety, more runtime checks needed

2. **Context API vs Redux/MobX**:
   - **Chose**: Context API
   - **Why**: Simple state, low complexity, React built-in
   - **Trade-off**: May not scale to very large apps

3. **Custom Components vs Library**:
   - **Chose**: Custom components
   - **Why**: Full control, no dependencies, assignment requirement
   - **Trade-off**: More code to maintain

4. **requestAnimationFrame vs Reanimated**:
   - **Chose**: requestAnimationFrame
   - **Why**: Sufficient for counter, no native dependencies
   - **Trade-off**: Less powerful for complex animations

## 🚧 Future Improvements

### High Priority
1. Add Firebase Authentication (email/password, Google Sign-In)
2. Enable offline persistence and sync
3. Add image thumbnails for file picker
4. Real-time upload progress from Firebase
5. Add unit tests for components and services
6. Add E2E tests with Detox

### Medium Priority
7. Add biometric authentication (Face ID, Touch ID)
8. Implement push notifications for onboarding status
9. Add multi-language support (i18n)
10. Improve accessibility (VoiceOver, TalkBack)
11. Add analytics (Firebase Analytics)

### Low Priority
12. Dark mode support
13. Tablet/landscape optimization
14. Add onboarding tutorial/walkthrough
15. Export onboarding data as PDF

## 📝 Design Decisions

### State Management
- **Context API**: Chosen for simplicity and built-in React support. Sufficient for single-screen form state.

### Validation Strategy
- **Client-side only**: All validation happens in the app before submission. Future: Add server-side validation.

### File Handling
- **Hybrid approach**: Mock files + real native picker for best testing and production experience.

### Error Handling
- **User-friendly modals**: All errors shown in clear modal dialogs with retry options.

### Animation
- **requestAnimationFrame**: Smooth 60fps counter without external dependencies.

## 📄 License

This project is created as an assignment for demonstration purposes.

## 👨‍💻 Developer Notes

### Code Style
- **ESLint**: Follows `@react-native` config
- **Prettier**: Consistent code formatting
- **Naming**: camelCase for functions/variables, PascalCase for components

### Git Workflow
- Feature branches: `feature/component-name`
- Commit messages: Follow conventional commits
- Pull requests: Required for main branch

### Firebase Security Rules

**Firestore** (`firestore.rules`):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Users/{document=**} {
      allow read, write: if true; // Open for demo - restrict in production
    }
  }
}
```

**Storage** (`storage.rules`):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /Users/{email}/{allPaths=**} {
      allow read, write: if true; // Open for demo - restrict in production
    }
  }
}
```

**⚠️ Important**: Update security rules for production to restrict access based on authentication.

---

## 🎯 Assignment Requirements Checklist

### Must-Have Features
- [x] CounterTimer component (reusable, animated, with controls)
- [x] TextInput component (reusable, validated, with helper text)
- [x] CalendarPicker component (reusable, modal, manual + visual entry)
- [x] FilePicker component (reusable, native picker, validation)
- [x] Main onboarding screen with all components
- [x] Form validation (name, email, date, files)
- [x] Firebase backend integration (Firestore + Storage)
- [x] File upload to Firebase Storage
- [x] Data save to Firestore
- [x] Success modal with file details
- [x] Error handling and network error recovery
- [x] Loading states and progress indicators
- [x] Safe area handling for notched devices

### Architecture & Code Quality
- [x] Clean folder structure (components, screens, services, hooks, utils)
- [x] Reusable component library
- [x] State management (Context API)
- [x] API client wrapper (services/api)
- [x] Centralized error handling
- [x] Accessibility considerations
- [x] Production-minded architecture

### Deliverables
- [x] Source code with clear structure
- [x] Comprehensive README with all required sections
- [x] Firebase backend integration
- [x] APK build instructions
- [ ] APK uploaded to Google Drive (pending)
- [ ] Demo video (optional)

---

**Built with ❤️ for the Senior Mobile App Developer assignment**
