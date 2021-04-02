import React, { useState } from "react";
import axios from "../api/axios";
import { connect } from "react-redux";
import { saveToken, saveUser } from "../actions";

const Login = ({ saveToken, saveUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    axios
      .post("/signin", { email, password })
      .then((response) => {
        const token = response.data.token;
        const user = response.data.user;
        saveUser(user);
        saveToken(token);
        setPassword("");
        setEmail("");
      })
      .catch((err) => alert("Invalid email or password!"));
  };

  return (
    <div className="col-6 center mx-auto">
      <h3 className="mx-auto">Enter Login Credentials</h3>
      <form onSubmit={submit}>
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

const mapStateToProps = (state) => ({ token: state.token });

export default connect(mapStateToProps, { saveToken, saveUser })(Login);
