import React from "react";
import { connect } from "react-redux";
import { saveToken } from "../actions";
import { Link } from "react-router-dom";

const navbar = ({ token, saveToken }) => {
  return (
    <div className="margin-bottom">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div>
            <Link to="/create" className="btn btn-success">
              Create
            </Link>
            {token === "" ? (
              <>
                <Link to="/login" className="margin-left btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="margin-left btn btn-secondary">
                  Signup
                </Link>
              </>
            ) : (
              <div
                onClick={() => saveToken("")}
                className="margin-left btn btn-danger"
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => ({ token: state.token });
export default connect(mapStateToProps, { saveToken })(navbar);
