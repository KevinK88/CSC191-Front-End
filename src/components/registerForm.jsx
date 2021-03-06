import React, { Component } from "react";

import axios from "axios";

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    axios
      .post("/signup", newUserData)
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        // axios.defaults.headers.common["Authorization"] = res.data.token;
        this.props.history.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1 className="form-group-center">Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: "600" }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              style={{
                backgroundColor: "#454545",
                color: "white",
                border: "1px solid black",
              }}
            />
            <label htmlFor="Password" style={{ fontWeight: "600" }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              style={{
                backgroundColor: "#454545",
                color: "white",
                border: "1px solid black",
              }}
            />
            <label htmlFor="Confirm Password" style={{ fontWeight: "600" }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              style={{
                backgroundColor: "#454545",
                color: "white",
                border: "1px solid black",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary mt-4 button-center"
              style={{
                backgroundColor: "#c4ffbf",
                border: "1px solid black",
                color: "black",
                fontWeight: "600",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
