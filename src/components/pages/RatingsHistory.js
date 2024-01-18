// import React, { useState, useEffect } from 'react';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { Form, Alert } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot , sizeInc, deleteDoc} from "firebase/firestore";

// const RatingsHistory = () => {
  
//     const [history, setHistory] = useState([])
//     const [user, loading, error] = useAuthState(auth);
//     const navigate = useNavigate();

//     const collectionRef = collection(db, 'ratingsHistory');
//     const q = query(collectionRef);
//     useEffect(() => {
//       if(loading) return;
//       if (!user) return navigate("/logupmain");
//       const getUsers = async () => {
//       const data = await getDocs(q);
//       setHistory(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
//       console.log(history);
//     };
//     getUsers(); 
//     }, [user, loading]);
//     console.log(history);
//     return (
//         <div>
//           <br/>
//           <hr />
//           <h1>Ratings History:</h1>
//           <br></br>
//           <table class="table">
//             <thead class="thead-dark">
//                 <tr>
//                 <th scope="col">Client</th>
//                 <th scope="col">Worker</th>
//                 <th scope="col">Rating</th>
//                 <th scope="col">Review</th>
//                 </tr>
//             </thead>
//             <tbody>
//           {history.map((S) => {
//             return(
//               <>
//               <tr>
//       <td>{S.user}</td>
//       <td>{S.worker}</td>
//       <td>{S.rating}</td>
//       <td>{S.review}</td>
//     </tr>
                
//               </>  
//             );
//           })}
//           </tbody>
//           </table>
//         </div>
//       )
    
// }

// export default RatingsHistory
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs } from "firebase/firestore";

const RatingsHistory = () => {
  
  const [history, setHistory] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const collectionRef = collection(db, 'ratingsHistory');
  const q = query(collectionRef);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/logupmain");

    const getUsers = async () => {
      const data = await getDocs(q);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers(); 
  }, [user, loading]);

  return (
    <div>
      <br />
      <hr />
      <h1>Ratings History:</h1>
      <br />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Worker</th>
            <th scope="col">Rating</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          {history.map((S) => (
            <tr key={S.id}>
              <td>{S.user}</td>
              <td>{S.worker}</td>
              <td>{S.rating}</td>
              <td>{S.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsHistory;
