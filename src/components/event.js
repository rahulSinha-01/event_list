import React from "react";

const Event = ({ eventDate, eventName, about, address, email }) => {
  return (
    <div className="event container">
      <h3>{eventName}</h3>
      <h4>on {eventDate}</h4>
      <p>at {address}</p>
      <p>by {email}</p>
    </div>
  );
};

export default Event;
