import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    invalid: false,
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      invalid: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/login", userData)
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        // axios.defaults.headers.common["Authorization"] = res.data.token;
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ invalid: true });
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state);
  };

  render() {
    let warning;
    if (this.state.invalid === true) {
      warning = <p style={{ color: "red" }}>Invalid Login</p>;
    }
    return (
      <div>
        <h1 className="form-group-center">Login</h1>

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
            <label htmlFor="password" style={{ fontWeight: "600" }}>
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
            {warning}

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

export default LoginForm;
