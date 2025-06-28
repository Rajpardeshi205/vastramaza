import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";    


const firebaseConfig = {
  apiKey: "AIzaSyB7Qov3Jm_ekEKewnjG6Z2q_6QyGXQxYHA",
  authDomain: "vastramaza.firebaseapp.com",
  projectId: "vastramaza",
  storageBucket: "vastramaza.firebasestorage.app",
  messagingSenderId: "905289767502",
  appId: "1:905289767502:web:c119ae4de74da22427811f",
  measurementId: "G-1CJZSN4GXG"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

const auth = getAuth(app);          
const db = getFirestore(app);      
const storage = getStorage(app);   

export { auth, db, storage };
