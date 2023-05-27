import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


interface Names {
    name: string;
    gender: string;
}

const Chat: React.FC = () => {

    const [randomGeneratedFirstName, setRandomGeneratedFirstName] = useState<string>('');
    const [randomGeneratedLastName, setRandomGeneratedLastName] = useState<string>('');
    const [allNames, setAllNames] = useState<Names[]>([]);


    const generateRandomName = () => {
        if (allNames.length !== 0) {

            const firstName = allNames[Math.floor(Math.random() * allNames.length)];
            console.log(firstName)
            setRandomGeneratedFirstName(firstName["name"]);

            const lastName = allNames[Math.floor(Math.random() * allNames.length)];
            if (firstName["gender"] == "boy") {
                setRandomGeneratedLastName(lastName["name"] + '-sen');
            } 
            else if (firstName["gender"] == "girl") {
                setRandomGeneratedLastName(lastName["name"] + '-dottir');
            }
        } else {
            return
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("last_name")) {
          navigate("/");
        }
        }, []);





    return (
        <div className='App'>
            <h1>Velkommen til chatten</h1>

        </div>
    )
}

export default Chat