import React, { useState, useEffect } from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { query, collection, getDocs } from 'firebase/firestore';

const WorkerReviews = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const collectionRef = collection(db, 'rating');
  const q = query(collectionRef);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/logupmain');

    const getUsers = async () => {
      const data = await getDocs(q);
      setHistory(
        data.docs
          .filter((doc) => doc.data().workerEmail === user?.email)
          .map((doc) => ({ ...doc.data().reviews }))
      );
    };

    getUsers();
  }, [user, loading]);

  return (
    <Container>
      {history.map((S, index) => (
        <div key={index} className="mt-4">
          <Card className="card" style={{ width: '70rem', padding: 20 }} hover>
            <Row>
              <Row style={{ paddingTop: 25, paddingLeft: 25 }}>
                <Card.Text>
                  <strong className="fs-4">Reviews:</strong>
                  <ul className="list-unstyled">
                    {Object.values(S).map((value, subIndex) => (
                      <li key={subIndex} className="fs-5">
                        <span className="me-2">{subIndex + 1}.</span>
                        {value}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Row>
            </Row>
          </Card>
        </div>
      ))}
    </Container>
  );
};

export default WorkerReviews;
