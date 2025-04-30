import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Rk8n1N2fzficZ2Smrgc78RhBuZmO_Mk",
  authDomain: "revaro-ai.firebaseapp.com",
  projectId: "revaro-ai",
  storageBucket: "revaro-ai.firebasestorage.app",
  messagingSenderId: "705323757254",
  appId: "1:705323757254:web:8bd2e085ca45d1070031c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app; 