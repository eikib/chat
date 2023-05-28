import React from 'react';
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import Home from './pages/Home'
import Chat from './pages/Chat'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// npm run build

const firebaseConfig = {
  apiKey: "AIzaSyCg0bm30Go66_1yDcFTBbjKcAXNklKSAXU",
  authDomain: "bouvet-7260c.firebaseapp.com",
  projectId: "bouvet-7260c",
  storageBucket: "bouvet-7260c.appspot.com",
  messagingSenderId: "670236563148",
  appId: "1:670236563148:web:30487ec7008cbe114d9469",
  measurementId: "G-32F2SLL7LF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()


function App() {
  return (
    <BrowserRouter>
     <Routes>
     <Route 
        path="/" 
        element= { <Home /> }
      />
      <Route
        path="/chat"
        element={<Chat /> }
          />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
