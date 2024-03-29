import React, { useState, useEffect } from 'react';
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import Check from './Check';
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
}from './BookNowElements.js';

const BookForm = () => {
  const routeChange = () =>{ 
    let path = '/bookedservices' + '/' + user?.email; 
    navigate(path);
  }

//const [service, setService] = useState('');
const [service, changeService] = useState();
const [type, changeType] = useState('');
const [location, changeLocation] = useState('');
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
const [BookedServices, changeServices] = useState([]);
const booked = [];
// const admin = require("firebase-admin");
console.log(user?.email)
useEffect(() => {
  if (loading) return;
  if (!user ) return navigate("/logupmain");
}, [user, loading]);

const addToHistory = async (e) =>{
  const historyCollectionRef = collection(db, "userHistory");
  const date = new Date();
  await addDoc(historyCollectionRef, {client: user?.email, type: type, location: location, service: service, status:"added", time: date});
  console.log("added to history");
}

const submitHandler = (e) =>{
    e.preventDefault();
    addToDB();
    console.log(type, location, service)
    addToHistory(e)
    alert("Details added successfully");
}


const addToDB = async () => {
    const q = query(collection(db, "users"), where("email", "==", user?.email));
    const data = await getDocs(q);
    console.log(data, "data");
    

    try{
        // console.log(1111);
    
      data.forEach( async (user) => {
        const getUser = doc(db, 'users', user.id);
        // await getWorker.update('{worker.id}/services', FieldValue.arrayUnion({name: 'nikhitha'}), {merge: true});
        await updateDoc(getUser, {
            bookedServices: arrayUnion({service: service, type: type, location: location, assignedTo: "", taken: false})
        });
        // changeServices(getUser.bookedServices);
        // console.log(bookedServices);
        // console.log(10);
        });
    } catch (e) {
      console.log("error occured");
    }
};

  return (
    <ServicesContainer>
      <br/><br/><center>
      <div className="containerservice">
         <div style={{width: '30%',paddingLeft: "100vw",}} className="p-4 box">
            <h2 className="mb-3">Select Service</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeService( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service</option>
                    <option value="homemaker">Home Maker</option>
                    <option value="eldercare">Elder Care</option>
                    <option value="babycare">Baby Care</option>
                    <option value="healthcare">Health Care</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeType( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service Type</option>
                    <option value="parttime">Part Time</option>
                    <option value="fulltime">Full Time</option>
                </Form.Control>
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control
                    required
                    type="text"
                    placeholder="City"
                    onChange={(e) => changeLocation( e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Book Service
                </Button>
              </div>
            </Form>
          </div>
          
        </div><br></br><br></br></center>
        <center>
            <div style={{width: '30%',paddingLeft: "10vw"}} className="p-4 box">
              <Button onClick={routeChange} variant="primary" type="Submit" size="lg" className="btn btn-success">
                Check Your Service
              </Button>
          </div>
        </center>
    
        </ServicesContainer>
    
  )
}

export default BookForm;

// </div><br></br>
// <ServicesContainer id="services">
// <ServicesWrapper>
    
//         {/* <ServicesIcon src={Icon1}/> */}
//         {/* <ServicesH2>Elder Care</ServicesH2>
//         <ServicesP>There are many different services that can minimize<br/>
//                    caregiver burden, extend a senior's independence, improve<br/>
//                    their safety and help them successfully age in place.<br/>
//                    Our Services include personal hygiene, cleaning, <br/> */}
//                    {/* grocery shopping, and managing medications.</ServicesP>
                   
//             */}
//         {temp.map((user) => {
// return(
// <ServicesCard>
//   <br/><br/>
//   <h4> service: {user.service}</h4>
//   <h4> type: {user.type}</h4>
//   <br />
//   <div>
//     <div className='row'>
//       <div className='col'>
//   <button className='btn btn-success' onClick={() => check(user)}>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
//   <button className='btn btn-danger' onClick={() => deleteHandler(user)}>Delete</button>
//   </div>
//     </div>
//   </div>
//   </ServicesCard>
// );
// })}
//     {/* </ServicesCard> */}
//     </ServicesWrapper>
//     </ServicesContainer>
// {temp.map((user) => {
// return(
// <div>
  
// </div>
// );
// })}