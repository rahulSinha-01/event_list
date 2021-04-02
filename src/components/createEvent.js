import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "../api/axios";

const CreateEvent = ({ token, user }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [about, setAbout] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `/event/${user._id}`,
        { eventName, eventDate, address, phoneNo, about },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEventName("");
        setAbout("");
        setAddress("");
        setPhone("");
        setEventDate("");
      })
      .catch((err) => alert(err.message));
  };
  const renderWhen = () => (
    <div>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="-name-">
            Event name
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="form-control"
            id="-name-"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Event Date
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleAdd" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleAdd"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone no.
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            value={phoneNo}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expAbt" className="form-label">
            About
          </label>
          <input
            type="text"
            className="form-control"
            id="expAbt"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
  return (
    <div>
      {token === "" ? <h1>Log in required!</h1> : <div>{renderWhen()}</div>}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token, user: state.user });

export default connect(mapStateToProps)(CreateEvent);
