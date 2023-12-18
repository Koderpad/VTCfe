// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOJ2X1nzZlJyCqcTRWZY_OdzHPo4WWXrs",
  authDomain: "vtc-firebase.firebaseapp.com",
  projectId: "vtc-firebase",
  storageBucket: "vtc-firebase.appspot.com",
  messagingSenderId: "223693073755",
  appId: "1:223693073755:web:4fc5790861ae4e50a03e7e",
  measurementId: "G-9M66MJE5XR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
