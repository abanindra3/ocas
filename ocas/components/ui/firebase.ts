import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyAjNNRLBKl0hklysTwmHNnOtYCV_UQn3jE",
  authDomain: "isl-sih-4c812.firebaseapp.com",
  projectId: "isl-sih-4c812",
  storageBucket: "isl-sih-4c812.firebasestorage.app",
  messagingSenderId: "452342571294",
  appId: "1:452342571294:web:d3456f34d9619f012aa90f",
  measurementId: "G-VG5HK4E3JJ"
};

// Conditionally initialize Firebase Analytics
if (typeof window !== 'undefined') {
  isSupported()
    .then((isAnalyticsSupported) => {
      if (isAnalyticsSupported) {
        getAnalytics(app);
      }
    })
    .catch((error) => {
      console.error('Error initializing Firebase Analytics:', error);
    });
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);