import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "../App";

class NavBar extends Component {
  logoutUser = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  render() {
    if (isAuthenticated()) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Intangible Manager
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/user">
                Projects
              </NavLink>
              <div
                onClick={this.logoutUser}
                className="nav-item nav-link clickable"
              >
                Log Out
              </div>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Intangible Manager
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/signup">
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
