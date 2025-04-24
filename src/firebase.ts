import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1Abguty3n0QbZjBO4-iDnrzOJichiKKA",
  authDomain: "property-listing-1.firebaseapp.com",
  projectId: "property-listing-1",
  storageBucket: "property-listing-1.firebasestorage.app",
  messagingSenderId: "796238805929",
  appId: "1:796238805929:web:05e9b598e4c220fe6222b8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
