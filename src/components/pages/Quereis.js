import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove, disableNetwork } from "firebase/firestore";
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';
import E from 'react-script';

const Quereis = () => {
    const [que, setQuery] = useState([]);
    const [question, setQuestion] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const authh = !(!user);
    let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      const queriesCollectionRef = collection(db, "queries");
      console.log("DFASDFADSFADFADFA");
      console.log(question);
      await addDoc(queriesCollectionRef, {query: question, answeredBy: "", answered: false, answer: ""});
      window.alert("added");
    
  };

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const collectionRef = collection(db, 'queries');
  const q = query(collectionRef, where('answer', '!=', ''));
  useEffect(() => {
    if(loading) return;
    const getUsers = async () => {
    const data = await getDocs(q);
    setQuery(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    // await addDoc(collectionRef, {query: "hi", answeredBy: "", answered: false, answer: ""});
  };
  getUsers(); 
  
  console.log("_________________");
  console.log(que);
  }, [user, loading]);
//   return (
//     <>

// {que.map((S) => (
//   <div key={S.id}> {/* Add a unique key, assuming S.id is a unique identifier */}
//     <Card className="card" style={{ width: '70rem', padding: 20 }} hover="true">
//       <Row>
//         <Row style={{ paddingTop: 25, paddingLeft: 25 }}>
//           {/* <Card.Text> */}
//           Query: {S.query}<br />
//           Answer: {S.answer}
//         </Row>
//       </Row>
//     </Card>
//   </div>
// ))}

    
//     <br></br><br></br>
//     <container>
//         <div className='row'>
//         <div className='col col-1'></div>
//         <div className='col col-10'>
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="query">
//         <Form.Label><h5>Post your queries here</h5></Form.Label>
//         <Form.Control as="textarea" rows={2} placeholder="Enter your query here" value={question} onChange={handleInputChange} />
//       </Form.Group><br></br>
//       <Button variant="primary" type="submit">Submit</Button>
//     </Form>
//     </div>
//     <div className='col col-1'></div>
//     </div>
//     </container>

//     </>
//   )
// }

// export default Quereis

return (
  <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
          <Col md={8}>
              {que.map((S) => (
                  <div key={S.id}>
                      <Card className="card" style={{ width: '70rem', padding: 20 }} hover="true">
                          <Row>
                              <Row style={{ paddingTop: 25, paddingLeft: 25 }}>
                                  Query: {S.query}<br />
                                  Answer: {S.answer}
                              </Row>
                          </Row>
                      </Card>
                  </div>
              ))}
              <br /><br />
              <container>
        <div className='row'>
        <div className='col col-1'></div>
        <div className='col col-10'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="query">
        <Form.Label><h5>Post your queries here</h5></Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="Enter your query here" value={question} onChange={handleInputChange} />
      </Form.Group><br></br>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </div>
    <div className='col col-1'></div>
    </div>
    </container>
          </Col>
      </Row>
  </Container>
)
}

export default Quereis;