// filepath: /c:/Users/ASUS/Vuejs/VueProject/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmXzaRLVPreo-rXb1Q0QpjCMajZIUd0W0",
  authDomain: "productinfo-543bf.firebaseapp.com",
  projectId: "productinfo-543bf",
  storageBucket: "productinfo-543bf.firebasestorage.app",
  messagingSenderId: "142074303891",
  appId: "1:142074303891:web:272715966b7f156793c466",
  measurementId: "G-HHVVM8L3K7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
