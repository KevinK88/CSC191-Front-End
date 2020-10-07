import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class User extends Component {
  state = { credentials: {}, projects: [] };

  async componentDidMount() {
    axios
      .get("/user")
      .then((res) => {
        this.setState({
          credentials: res.data.credentials,
          projects: res.data.projects,
        });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (project) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete("/project/" + project.projectId)
        .then((res) => {})
        .catch((err) => console.log(err));
      const projects = this.state.projects.filter(
        (p) => p.projectId !== project.projectId
      );
      this.setState({ projects });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Link
          to={{
            pathname: "/project/new",
            state: { email: this.state.credentials.email },
          }}
          className="btn btn-primary"
          style={{
            backgroundColor: "#c4ffbf",
            border: "none",
            color: "black",
            marginBottom: 20,
          }}
        >
          New Project
        </Link>
        <table className="table">
          <tbody>
            {this.state.projects.map((project) => (
              <tr key={project.projectId}>
                <td>
                  <Link
                    to={`/project/${project.projectId}`}
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {project.projectName}
                  </Link>
                </td>
                <td className="d-flex justify-content-end">
                  <Link
                    to={`/project/${project.projectId}/edit/${project.projectName}`}
                    className="btn btn-primary btn-sm mr-2"
                    style={{
                      backgroundColor: "#c4ffbf",
                      border: "none",
                      color: "black",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => this.handleDelete(project)}
                    className="btn btn-danger btn-sm"
                    style={{
                      backgroundColor: "#ffbfbf",
                      border: "none",
                      color: "black",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default User;
