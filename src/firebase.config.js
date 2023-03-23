import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVvZ0KZO3DVv86TsY2ZdTJz2QmG3xzm_g",
  authDomain: "blog-backup-40046.firebaseapp.com",
  projectId: "blog-backup-40046",
  storageBucket: "blog-backup-40046.appspot.com",
  messagingSenderId: "284302073538",
  appId: "1:284302073538:web:8439a4e18566026938e55b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();