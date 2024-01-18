import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UnauthorisedWorker from './UnauthorisedWorker';
import BookForm from "./BookForm";
import ServiceForm from './ServiceForm';


const Book = () =>{
    
    const [user, loading] = useAuthState(auth);
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const email = user ? user?.email: 'undefined';
    const collectionRef = collection(db, 'users');
    // console.log(user.auth);
    
    useEffect(() => {
        if (loading) return;
        if (!user ) return navigate("/logupmain");
      }, [user, loading]);
 
    return(
        <div>
<BookForm />
           
        </div>
    )
}

export default Book;

