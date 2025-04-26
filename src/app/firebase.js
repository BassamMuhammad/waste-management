import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZkwfHW2hlobueTZLt4CH6esz4c3rWp_4",
  authDomain: "waste-management-4ab40.firebaseapp.com",
  projectId: "waste-management-4ab40",
  storageBucket: "waste-management-4ab40.firebasestorage.app",
  messagingSenderId: "128630691841",
  appId: "1:128630691841:web:6895895c332387fa4c0800",
  measurementId: "G-9HM9SCW6FH",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
