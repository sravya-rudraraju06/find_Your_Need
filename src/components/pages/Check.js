import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove, disableNetwork } from "firebase/firestore";
import { useParams } from 'react-router-dom'
// import { getAuth } from "firebase/auth";
import Cards from './Cards';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';
import NoMatches from './NoMatches';

const Check = () => {
  var {service, type, loc, email} = useParams();
  console.log(service, type, loc);
  
  const [user, loading, error] = useAuthState(auth);
  var ue = user?.email ? user : undefined;
  const navigate = useNavigate();
  const [matchedWorkers, setMatchedWorkers] = useState([]);
  const [selSer, changeSelSer] = useState([]);
  const [array, changeArray] = useState([]);
  const [docID, changeDocID] = useState(0);
  const [ID, changeID] = useState(0);
  // const [dis, changeDis] = useState(true)
  const collectionRef = collection(db, 'services');
  // const auth = getAuth();
  // const u = auth.currentUser;
  const q = query(collectionRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('taken', '==', false), where('active', '==', true));
  const qsel = query(collectionRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('acceptedBy', '==', email));
  useEffect(() => {
    if(loading) return;
    if (!user) return navigate("/logupmain");
    const getUsers = async () => {
    const data = await getDocs(q);
    setMatchedWorkers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    const d = await getDocs(qsel);
    changeSelSer(d.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };
  // console.log(u.name)s
  // changeSize(selSer.length)
  console.log(selSer);
  // console.log("sizeeeeee")
  // console.log(size)
  getUsers(); 
  // changeSize(selSer.length)

  }, [user, loading]);
  // changeSize(selSer.length)


const routeChange = (s) =>{
  // const path = 'ratings/' + s.workerEmail;
  navigate(s.workerEmail);
}


  const change = async () => {
    console.log("changed")
    const userDoc = doc(db, 'users', docID)
    await updateDoc(userDoc, {bookedServices: array})
  }
  const changeService = async (em, t) =>{
    console.log("....")
    console.log(ID)
    const serviceDoc = doc(db, 'services', ID);
    
    await updateDoc(serviceDoc, {acceptedBy: em, taken: t});
    // await updateDoc(serviceDoc, {});
    console.log("cccccc");
  }
  // const changeActiveT = async (id, st) =>{
  //   const matchedDoc = doc(db, 'workers', id)
  //   await updateDoc(matchedDoc, {active: true})
  // }
  
  // const changeActiveServicesT = async (id, st) =>{
  //   const matchedDoc = doc(db, 'services', id)
  //   await updateDoc(matchedDoc, {active: true})
  // }
  const changeActive = async (id, st) =>{
    console.log("jfahsdfjhsadjhfgjasdshgkjadhsgfjkahsdgkjfhakhfakhds")
    const matchedDoc = doc(db, 'workers', id)
    await updateDoc(matchedDoc, {active: st})
    console.log("active")
  }

  const changeActiveServices = async (id, st) =>{
    const matchedDoc = doc(db, 'services', id)
    await updateDoc(matchedDoc, {active: st})
  }

  const disable = async (email, st) => {
    const workersRef = collection(db, 'services')
    const qw = query(workersRef, where('workerEmail', '==', email));
    onSnapshot(qw, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        changeActiveServices(doc.id, st)
      })
  });
  //   const servicesRef = collection(db, 'services')
  //   const qs = query(servicesRef, where('workerEmail', '==', email), where('service', '==', service), where('type', '==', type), where('location', '==', loc));
  //   onSnapshot(qs, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if(state == true){
  //         changeActiveServicesT(doc.id, state);
  //         }else{
  //           changeActiveServicesF(doc.id, state);
  //         }
        
  //     })
  // });
  console.log("disabled")
  }

  const addToHistory = async (d, key) =>{
    const historyCollectionRef = collection(db, "bookingHistory");
    const date = new Date();
    if(key == true){
    await addDoc(historyCollectionRef, {client: email, worker: d.workerEmail, type: d.type, location: d.location, service: d.service, status:"booked", time: date, salary: d.salary});
    }
    else{
      await addDoc(historyCollectionRef, {client: email, worker: d.workerEmail, type: d.type, location: d.location, service: d.service, status:"declined", time: date, salary: d.salary})
    }
    console.log("added to istory")
  }

  const assign = async (e, em, taken, d, active, wemail, document) => {
    // var a = []
    console.log(active);
    const usersRef = collection(db, 'users');
    const servicesRef = collection(db, 'services')
    const qu = query(usersRef, where('email', '==', email));
    const que = query(servicesRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('taken', '==', false), where('active', '==', true), where('workerEmail', '==', wemail));
    const decline = query(servicesRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('workerEmail', '==', wemail));
    onSnapshot(qu, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().bookedServices);
        changeArray(doc.data().bookedServices);
        changeDocID(doc.id)
      })
  });
  for(let i = 0; i < array.length; i++){
    if(array[i]["service"] == service && array[i]["location"] == loc && array[i]["type"] == type){
      array[i]["assignedTo"] = e;
      array[i]["taken"] = taken;
      console.log(array)
    }
  }
  // array[0]["assignedTo"] = e;
  // array[0]["taken"] = taken;
  // console.log(array)
  change()
  
if(d){
onSnapshot(decline, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    changeID(doc.id)
  })
});
}
else{
  onSnapshot(que, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      changeID(doc.id)
    })
});
}
changeService(em, taken, active);
disable(wemail, active);
console.log("0000000000000000000000000000000")
const qw = query(collection(db, 'workers'), where('email', '==', wemail));
    onSnapshot(qw, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          changeActive(doc.id, active);
      })
  });
addToHistory(document, taken);

}

return (
  <div>
    <br/>
    <h1>Selected Worker:</h1>
    {selSer.length == 0 && <NoMatches text = {"No Worker was selected"}/>}
    {selSer.map((S) => {
      return(
        <div className = "Container">
    <center>
      <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
        <Row>
          <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://cdn0.iconfinder.com/data/icons/energy-industry-1/62/worker_engineer_icon_miner_helmet_builder_workman_man_job-1024.png"/></Col>
          <Col xs={8}>
            <Row style={{paddingTop: 25, paddingLeft: 25}}>
              <Card.Text>
                Worker Name: {S.workerEmail.split('@')[0]}<br/>
                Worker Email: {S.workerEmail}<br/>
                Phone: XXXXXXXXXX<br/>
                Service: {S.service}<br />
                Type: {S.type}<br />
                Location: {S.location}<br />
                Salary: {S.salary}<br />
                rating: stars<br />
              </Card.Text>
            </Row>
            <Row>
              <div className="mb-2"style={{paddingTop: 25}}>
                <Button style={{ width: "100px", height: "50px",}} className='btn btn-danger' onClick={() => assign("", "", false, true, true, S.workerEmail, S)}>Decline</Button>&nbsp;
                <Button style={{ width: "100px", height: "50px",}} className='btn btn-success' onClick={() => (routeChange(S))}>Rate Us</Button>{' '}
                {/* <Button style={{ width: "100px", height: "50px",}} className='btn btn-success'>Rate Us</Button>{' '} */}
              </div>
            </Row>
            </Col>
          </Row>
        </Card>
      </center>
    </div>  
        );
      })}
      <br/>
      <hr />
      <h1>Matched Workers:</h1>
      {matchedWorkers.map((S) => {
        return(
          <>
          <div className = "Container">
      <center>
        <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
          <Row>
            <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://cdn0.iconfinder.com/data/icons/energy-industry-1/62/worker_engineer_icon_miner_helmet_builder_workman_man_job-1024.png"/></Col>
            <Col xs={8}>
              <Row style={{paddingTop: 25, paddingLeft: 25}}>
                <Card.Text>
                  WorkerName: {S.workerEmail.split('@')[0]}<br/>
                  Service: {S.service}<br />
                  Type: {S.type}<br />
                  Location: {S.location}<br />
                  Salary: {S.salary}<br />
                  rating: stars<br />
                </Card.Text>
              </Row>
              <Row>
                <div className="mb-2"style={{paddingTop: 25}}>
                  {/* {
                  size > ? <div></div> : <div>bye</div>
                  } */}
            <Button variant="success" size="lg" disabled = {selSer.length != 0} onClick={() => assign(S.workerEmail, email, true, false, false, S.workerEmail, S)}>Accept</Button>{' '}
                    <Button variant="danger" size="lg" onClick={() => assign("", "", false, false, true, S.workerEmail)}>Decline</Button>{' '}
                </div>
              </Row>

            </Col>
          </Row>
        </Card>
      </center>
    </div>
          {/* <Cards workerEmail = {S.workerEmail} service = {S.service} type = {S.type} location = {S.location} salary = {S.salary}/> */}
            {/* <br/><br/>
            <h4> service: {S.service}</h4>
            <h4> type: {S.type}</h4>
            <h4>location: {S.location}</h4>
            <h4>Salary: {S.salary}</h4>
            <br /> */}
            {/* <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(user)}>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => deleteHandler(user)}>Delete</button>
            </div>
              </div>
            </div> */}
          </>  
        );
      })}
 {matchedWorkers.length == 0 && <NoMatches text = {"No Matched Workers were Found"}/>}
    </div>
  )


}

export default Check;
