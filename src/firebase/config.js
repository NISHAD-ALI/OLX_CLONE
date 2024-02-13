import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBAr22TN9VyH9PX_rq2pFZwO19zYVxyI2o",
  authDomain: "olx-new-89ad6.firebaseapp.com",
  projectId: "olx-new-89ad6",
  storageBucket: "olx-new-89ad6.appspot.com",
  messagingSenderId: "1051701923945",
  appId: "1:1051701923945:web:33c9108277a94f8ff4d2f8",
  measurementId: "G-RR8BNBCNRQ"
};
const Firebase = initializeApp(firebaseConfig);

const Firestore = getFirestore(Firebase)
const storage = getStorage(Firebase)
const auth = getAuth(Firebase);


export { auth, Firestore, storage };