// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkUjRCYf7rDvDOfsYzIC-LPHZzQy4E9rM",
  authDomain: "to-do-list-925e6.firebaseapp.com",
  projectId: "to-do-list-925e6",
  storageBucket: "to-do-list-925e6.appspot.com",
  messagingSenderId: "737994990906",
  appId: "1:737994990906:web:c9fc07a6085e34709b5c03",
  measurementId: "G-D8ET4JLN31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;