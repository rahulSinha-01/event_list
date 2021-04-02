import React, { useState } from "react";
import axios from "../api/axios";
import { saveToken, saveUser } from "../actions";
import { connect } from "react-redux";

const Signup = ({ saveToken, saveUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    axios
      .post("/signup", { email, name, password })
      .then((response) => {
        const token = response.data.token;
        const user = response.data.user;
        console.log(response.data);
        saveToken(token);
        saveUser(user);
        setPassword("");
        setEmail("");
        setName("");
      })
      .catch((err) => alert("User already Exist!"));
  };

  return (
    <div className="col-6 center mx-auto">
      <h3 className="mx-auto">Enter to Register</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="-name-">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="-name-"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps, { saveToken, saveUser })(Signup);
