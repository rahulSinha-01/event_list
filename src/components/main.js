import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Event from "./event";
const Main = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    (async () =>
      axios
        .get("/event")
        .then((response) => {
          setEvent(response.data);
          console.log(event);
        })
        .catch())();
  }, []);

  const renderEvents = () => {
    return event.map((val) => (
      <Event
        eventDate={val.eventDate}
        eventName={val.eventName}
        about={val.about}
        address={val.address}
        email={val.email}
        key={val._id}
      />
    ));
  };
  return <div>{event.length === 0 ? <div></div> : renderEvents()}</div>;
};

export default Main;
