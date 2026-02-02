import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB3UgW6Azrqo139BM35jwdoPbF_HF-sYDc',
  authDomain: 'onboardingdemo-b51f2.firebaseapp.com',
  projectId: 'onboardingdemo-b51f2',
  storageBucket: 'onboardingdemo-b51f2.firebasestorage.app',
  messagingSenderId: '616440180007',
  appId: '1:616440180007:web:d7a8e24eac89e4a9f40d02',
  measurementId: 'G-3C15KETCPG',
};

export const firebaseApp = initializeApp(firebaseConfig);
