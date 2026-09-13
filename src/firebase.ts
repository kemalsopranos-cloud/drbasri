import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0824204549",
  appId: "1:805996355962:web:26ed1615af7987467c36c3",
  apiKey: "AIzaSyCAZBkYTH5gL_y-ytqDJ6ysy3Vdpjv_3SU",
  authDomain: "gen-lang-client-0824204549.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-profdrbasriakrol-1ca8d888-0bab-4300-ba4f-e2b11399ca55",
  storageBucket: "gen-lang-client-0824204549.firebasestorage.app",
  messagingSenderId: "805996355962",
  measurementId: "",
  oAuthClientId: "805996355962-bnfc3ops6dklobt5c2qaejdoh14rgpj2.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId || "(default)");
