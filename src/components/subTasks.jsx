import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SubTasks extends Component {
  state = {
    projectId: "",
    taskName: "",
    taskId: "",
    taskDescription: "",
    dueDate: "",
    subTasks: [],
  };

  async componentDidMount() {
    axios
      .get(
        `/project/${this.props.match.params.projectId}/task/${this.props.match.params.taskId}`
      )
      .then((res) => {
        this.setState({
          projectId: res.data.projectId,
          taskName: res.data.taskName,
          taskId: res.data.taskId,
          taskDescription: res.data.taskDescription,
          dueDate: res.data.dueDate.seconds,
          subTasks: res.data.subTasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(this.state);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.taskId !== this.props.match.params.taskId) {
      axios
        .get(
          `/project/${this.props.match.params.projectId}/task/${this.props.match.params.taskId}`
        )
        .then((res) => {
          this.setState({
            projectId: res.data.projectId,
            taskName: res.data.taskName,
            taskId: res.data.taskId,
            taskDescription: res.data.taskDescription,
            dueDate: res.data.dueDate.seconds,
            subTasks: res.data.subTasks,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // console.log(this.state);
  }

  handleDelete = (task) => {
    if (window.confirm("Are you sure you want to delete this Task?")) {
      axios
        .delete(`/project/${this.state.projectId}/task/${task.taskId}`)
        .then((res) => {})
        .catch((err) => console.log(err));
      const tasks = this.state.subTasks.filter((t) => t.taskId !== task.taskId);
      this.setState({ subTasks: tasks });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3>{this.state.taskName}</h3>
        <h5>{this.state.taskDescription}</h5>
        <h6>Due: {this.state.dueDate}</h6>

        <Link
          to={{
            pathname: `/project/${this.props.match.params.projectId}/task/${this.state.taskId}/subtask`,
            state: {
              parentTaskId: this.state.taskId,
              type: "new sub",
            },
          }}
          className="btn btn-primary mt-2"
          style={{ marginBottom: 20 }}
        >
          New Task
        </Link>
<<<<<<< HEAD
        <table className="table">
=======
        <table className="table" style={{ textDecoration: "none" }}>
>>>>>>> c158f7a2298e56cda5144510bda855514c1fe72a
          <tbody>
            {this.state.subTasks.map((task) => (
              <tr key={task.taskId}>
                <td>
                  <Link
                    to={`/project/${this.state.projectId}/task/${task.taskId}`}
                  >
                    {task.taskName}
                  </Link>
                </td>
                <td>{task.taskDescription}</td>
                <td>SubTasks: {task.subTaskCount}</td>
                <td>Due Date: {task.dueDate.seconds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default SubTasks;
