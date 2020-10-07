import React from "react";
import axios from "axios";
import { Component } from "react";

class ProjectForm extends Component {
  state = {
    projectName: "",
    projectId: "",
    email: "",
    // errors: {},
  };

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    if (!projectId) {
      this.setState({ email: this.props.location.state.email });
    } else {
      this.setState({
        projectName: this.props.match.params.projectName,
        projectId,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email) {
      axios
        .post(`/project`, {
          projectName: this.state.projectName,
          email: this.state.email,
        })
        .then((res) => this.props.history.push("/user"))
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`/project/${this.state.projectId}/edit`, {
          projectName: this.state.projectName,
        })
        .then((res) => {
          this.props.history.push("/user");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <h1>Project Details</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              className="form-control"
              value={this.state.projectName}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary mt-2"
              style={{
                backgroundColor: "#c4ffbf",
                border: "none",
                color: "black",
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

export default ProjectForm;
