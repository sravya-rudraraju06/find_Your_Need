import React, { useState, useEffect } from 'react';
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, storage } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, onSnapshot, arrayRemove } from "firebase/firestore";


import { useParams } from 'react-router-dom'
const Details= () => {

const [pathac, setpathac] = useState();
const [pathpc, setpathpc] = useState('');
const [pathimg, setpathimg] = useState('');
const [urlac, seturlac] = useState();
const [urlpc, seturlpc] = useState('');
const [urlimg, seturlimg] = useState('');
const [urlac1, seturlac1] = useState();
const [urlpc1, seturlpc1] = useState('');
const [urlimg1, seturlimg1] = useState('');
const [temp, setTemp] = useState('');
const [itemList, setItemList] = useState([]);
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
var {email} = useParams();

useEffect(() => {
  if (loading) return;
  if (!user ) return navigate("/logupmain");
  const collectionRef = collection(db, 'workers');
  const q = query(collectionRef, where('email', '==', email));
  console.log(1234);
  onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setpathac(doc.data().pathac)
        setpathpc(doc.data().pathpc)
        setpathimg(doc.data().pathimg)
        setTemp(pathac)
      })
      console.log(temp);
  });
  const s = pathac
  console.log(pathac, pathimg, s)
  console.log(pathpc)
  console.log("abc");
  getImageURL(s);
  const t = pathpc
  getImageURL(t)
  const u = pathimg
  getImageURL(u)
//   urlac.then((fulfilledValue) => {
//     seturlac1(fulfilledValue);
//     // Access the properties of the fulfilled object here
// });
// urlpc.then((fulfilledValue) => {
//   seturlpc1(fulfilledValue);
//   // Access the properties of the fulfilled object here
// });
// urlimg.then((fulfilledValue) => {
//   seturlimg1(fulfilledValue);
//   // Access the properties of the fulfilled object here
// });
//   console.log(urlac1, pathpc, pathimg)
console.log(urlac)
console.log(temp)
}, [user, loading]);


const getImageURL = async (imageName) => {
    // Create a reference to the image in Firebase Storage
    const storageRef = ref(storage, 'workerIdentities/' + imageName);
  
    try {
      // Get the download URL for the image
      const imageURL = await getDownloadURL(storageRef);
      
      // Use imageURL in your application
      console.log("Image URL:", imageURL);
      setItemList(prevList => [...prevList, imageURL]);
      console.log(itemList)
      setTemp(imageURL)
      // set(imageURL)
      
      // Now you can use the imageURL to display the image or perform other tasks
      return JSON.stringify(imageURL);
    } catch (error) {
      // Handle errors (e.g., if the image doesn't exist)
      console.error("Error getting image URL:", error.message);
      return null;
    }
  };
  
  
  const imageStyle = {
    width: '200px', // Set your desired width
    height: '150px', // Set your desired height
    objectFit: 'cover', // Maintain aspect ratio and cover container
    borderRadius: '8px', // Optional: Add rounded corners
  };

  return (
    <div className="container mt-5">

      <div className="row">
        <div className="col-md-4 text-center">
          <img src={itemList[0]} alt="Aadhar Card" className="img-fluid rounded" style={imageStyle}/>
          <p className="mt-2">Aadhar Card</p>
        </div>

        <div className="col-md-4 text-center">
          <img src={itemList[1]} alt="Pan Card" className="img-fluid rounded" style={imageStyle}/>
          <p className="mt-2">Pan Card</p>
        </div>

        <div className="col-md-4 text-center">
          <img src={itemList[2]} alt="Image" className="img-fluid rounded" style={imageStyle}/>
          <p className="mt-2">Image</p>
        </div>
      </div>
    </div>
    
  )
}

export default Details;