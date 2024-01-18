import React from "react";
import { useNavigate } from "react-router-dom";
import users from "./userhis.png";
import workers from "./workhis.jpg";
import booking from "./booking.png";
import ratings from "./ratingshis.jpg"; 

const AdminHistory = () => {
  const navigate = useNavigate();

  const toBookingHistory = () => {
    let path = "/bookingHistory";
    navigate(path);
  };

  const toWorkersHistory = () => {
    let path = "/workersHistory";
    navigate(path);
  };

  const toUsersHistory = () => {
    let path = "/usersHistory";
    navigate(path);
  };

  const toRatingsHistory = () => {
    let path = "/ratingsHistory";
    navigate(path);
  };

  return (
    <div style={{ textAlign: "center"}}>
      <h1>History Details</h1>
      <br />
      <div style={{ display: "flex" }}>
        <button
          type="submit"
          onClick={toBookingHistory}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={booking}
            height="250"
            width="250"
            alt="Booking History"
            style={{ borderRadius: "50%" }}
          />
        </button>
        <button
          type="submit"
          onClick={toUsersHistory}
          style={{ borderRadius: "50%"}}
        >
          <img
            src={users}
            height="250"
            width="250"
            alt="Users History"
            style={{ borderRadius: "50%" }}
          />
        </button>
        <button
          type="submit"
          onClick={toWorkersHistory}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={workers}
            height="250"
            width="250"
            alt="Workers History"
            style={{ borderRadius: "50%" }}
          />
        </button>
        <button
          type="submit"
          onClick={toRatingsHistory}
          style={{ borderRadius: "50%" }}
        >
          <img
            src={ratings}
            height="250"
            width="250"
            alt="Workers History"
            style={{ borderRadius: "50%" }}
          />
        </button>
      </div>
      <h1>
    &nbsp;&nbsp;&nbsp;&nbsp;Booking History &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User's History &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Worker's History&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ratings History
      </h1>
    </div>
  );
};

export default AdminHistory;
