import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SubTasks extends Component {
  state = {
    projectId: "",
    taskName: "",
    taskId: "",
    taskDescription: "",
    completed: "",
    priority: "",
    parentTaskId: "",
    dueDate: {},
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
          dueDate: res.data.dueDate,
          subTasks: res.data.subTasks,
          priority: res.data.priority,
          completed: res.data.completed,
          parentTaskId: res.data.parentTaskId,
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
            dueDate: res.data.dueDate,
            subTasks: res.data.subTasks,
            priority: res.data.priority,
            parentTaskId: res.data.parentTaskId,
            completed: res.data.completed,
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

  handleDeleteMain = () => {
    const parentTaskId = this.state.parentTaskId;
    if (window.confirm("Are you sure you want to delete this Task?")) {
      axios
        .delete(`/project/${this.state.projectId}/task/${this.state.taskId}`)
        .then((res) => {})
        .catch((err) => console.log(err));
      if (parentTaskId === "0") {
        this.props.history.push(`/project/${this.state.projectId}`);
      } else {
        this.props.history.push(
          `/project/${this.state.projectId}/task/${parentTaskId}`
        );
      }
    }
  };

  getDaysLeft = (dueDateString) => {
    var dueDate = new Date(dueDateString);
    var today = new Date(Date.now());
    // console.log(dueDate, today);
    return Math.floor(
      (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2 style={{ marginBottom: 2, fontWeight: 400 }}>
          {this.state.taskName}
        </h2>
        <p style={{ color: "#c9c9c9", marginBottom: 5 }}>
          {this.state.taskDescription}
        </p>
        {!this.state.completed && (
          <p style={{ color: "#e57373", marginBottom: 0 }}>Incomplete</p>
        )}
        {this.state.completed && (
          <p style={{ color: "green", marginBottom: 0 }}>Complete</p>
        )}
        <p style={{ marginBottom: 5 }}>
          {this.getDaysLeft(this.state.dueDate)} days until{" "}
          <span style={{ fontWeight: "bold", marginBottom: 5 }}>
            {this.state.dueDate.toString()}
          </span>
        </p>
        <Link
          to={{
            pathname: `/project/${this.state.projectId}/task/${this.state.taskId}/edit`,
            state: {
              parentTaskId: this.state.parentTaskId,
              taskId: this.state.taskId,
              taskName: this.state.taskName,
              taskDescription: this.state.taskDescription,
              priority: this.state.priority,
              completed: this.state.completed,
              dueDate: this.state.dueDate,
              type: "edit subpage",
            },
          }}
          className="btn btn-primary btn-sm mr-2"
        >
          Edit
        </Link>
        <button
          onClick={() => this.handleDeleteMain()}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
        <Link
          to={{
            pathname: `/project/${this.props.match.params.projectId}/task/${this.state.taskId}/subtask`,
            state: {
              parentTaskId: this.state.taskId,
              type: "new sub",
            },
          }}
          className="btn btn-primary mt-2"
          style={{ marginLeft: 15, marginBottom: 10 }}
        >
          New Subtask
        </Link>
        <table
          className="table"
          style={{ color: "white", textDecoration: "none" }}
        >
          <tbody>
            {this.state.subTasks.map((task) => (
              <tr key={task.taskId}>
                <td>{task.priority}</td>
                <td>
                  <Link
                    to={`/project/${this.state.projectId}/task/${task.taskId}`}
                  >
                    {task.taskName}
                  </Link>
                </td>
                <td>{task.taskDescription}</td>
                {/*<td>SubTasks: {task.subTaskCount}</td>*/}
                <td>{task.subTaskCount} Tasks</td>
                <td>{this.getDaysLeft(task.dueDate)} Days Left</td>
                {!task.completed && (
                  <td style={{ color: "#e57373" }}>Incomplete</td>
                )}
                {task.completed && <td style={{ color: "green" }}>Complete</td>}
                <td className="d-flex justify-content-end">
                  <Link
                    to={{
                      pathname: `/project/${this.state.projectId}/task/${task.taskId}/edit`,
                      state: {
                        parentTaskId: task.parentTaskId,
                        taskId: task.taskId,
                        taskName: task.taskName,
                        taskDescription: task.taskDescription,
                        priority: task.priority,
                        dueDate: task.dueDate,
                        completed: task.completed,
                        type: "edit sub",
                      }, //
                    }}
                    className="btn btn-primary btn-sm mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => this.handleDelete(task)}
                    className="btn btn-danger btn-sm"
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

export default SubTasks;
