import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyA-xMWSOBXxG9BOtONw-TmXcvKpr5eiIPA",
  authDomain: "react-f0ed7.firebaseapp.com",
  databaseURL: "https://react-f0ed7-default-rtdb.firebaseio.com",
  projectId: "react-f0ed7",
  storageBucket: "react-f0ed7.appspot.com",
  messagingSenderId: "329733054550",
  appId: "1:329733054550:web:c015897b2f7043c9ebdbf7",
  measurementId: "G-DD0MZGJ9JR"
};
    
const fireDB =  firebase.initializeApp(firebaseConfig);
export default fireDB;
