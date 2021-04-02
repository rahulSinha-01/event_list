import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/navbar";
import Home from "./components/main";
import Login from "./components/login";
import Signup from "./components/signup";
import EventForm from "./components/createEvent";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/create" component={EventForm} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
};

export default App;
