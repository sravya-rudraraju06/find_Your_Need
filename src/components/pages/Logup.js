import React from "react";
//import Card from "react-bootstrap/Card";
//import {BrowserRouter as Router, Link} from 'react-router-dom';
import client from "./clientig.jpg";
import admin from "./adminig.png";
import worker from "./Worker.jpeg";

const LogUp = () => {
  return (
    <div>
      <center>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#696969",display: "inline-block" }}>
           Signup or Login
         </h1>
        </div>
        <br />
        <br />
        <h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Client
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Worker
        </h1>
        <a href="./ClientSignupMain">
          <img src={client} height="250" width="250" alt="client" />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./AdminLoginMain">
          <img src={admin} height="250" width="250" alt="admin" />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./WorkerSignupMain">
          <img src={worker} height="250" width="250" alt="worker" />
        </a>
      </center>
    </div>
  );
};

export default LogUp;
