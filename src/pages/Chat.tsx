import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

interface Messages {
    author: string;
    message: string;
}

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
  const db = getFirestore();
  const colRef = collection(db, 'messages');


const Chat: React.FC = () => {
    const [allMessages, setAllMessages] = useState<Messages[]>([]);
    const [message, setMessage] = useState<string>('');

    const q = query(colRef, orderBy('createdAt', "desc"), limit(10));

    const unsubscribe = () => {
        onSnapshot(q, (snapshot) => {
            var messages: Messages[] = []
            snapshot.docs.forEach((doc) => {
                messages.push({ author: doc.get('author'), message: doc.get('message') })
            })
            messages.reverse();
            setAllMessages(messages);
        })
    }

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
      };

    const addMessage = () => {
        addDoc(colRef, {
            author: localStorage.getItem("name"),
            message: message,
            createdAt: serverTimestamp(),
        }).then(() => setMessage(''));
      };


    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("name")) {
          navigate("/");
        }
        }, []);
    
    useEffect(() => {
        unsubscribe();
        }, []);


    return (
        <div className='App'>
            <h1>Velkommen til chatten</h1>
            {allMessages.length !== 0 ?
            <div>
            {allMessages.map((object) => (
              <div className='messageBox'>
              <p>{object["author"]}</p>
              <p>{object["message"]}</p>
              </div>
            ))}
            <input type="text" value={message} placeholder="Skriv melding..." onChange={handleChangeMessage}/>
            <button className='button' onClick={addMessage}>Send melding</button>
            </div> : <div></div>
            }
        </div>
    )
}

export default Chat