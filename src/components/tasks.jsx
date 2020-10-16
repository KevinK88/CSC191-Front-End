import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Tasks extends Component {
  state = {
    projectId: "",
    projectName: "",
    tasks: [],
    subTasks: [],
  };

  async componentDidMount() {
    axios
      .get(`/project/${this.props.match.params.projectId}`)
      .then((res) => {
        this.setState({
          projectId: res.data.projectId,
          projectName: res.data.projectName,
          tasks: res.data.tasks,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete = (task) => {
    if (window.confirm("Are you sure you want to delete this Task?")) {
      axios
        .delete(`/project/${this.state.projectId}/task/${task.taskId}`)
        .then((res) => {})
        .catch((err) => console.log(err));
      const tasks = this.state.tasks.filter((t) => t.taskId !== task.taskId);
      this.setState({ tasks });
    }
  };

  getSubtasks = (task) => {
    if (this.state.expanded === false) {
      axios
        .get(`/project/${this.state.projectId}/task/${task.taskId}`)
        .then((res) => {
          this.setState({ subTasks: res.data.subTasks, expanded: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.state.expanded === true) {
      this.setState({ expanded: false });
    }
    console.log(this.state.subTasks, this.state.expanded);
  };

  getDaysLeft = (dueDateString) => {
    var dueDate = new Date(dueDateString);
    var today = new Date(Date.now());
    // console.log(dueDate, today);
    return Math.floor(
      (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  };

  renderCard = (task) => {
    return (
      <div key={task.taskId} className="card text-white bg-dark">
        <Link
          to={`/project/${this.state.projectId}/task/${task.taskId}`}
          className="card-body clickable"
          style={{ textDecoration: "none" }}
        >
          <h5
            className="card-title"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              color: "#c4ffbf",
            }}
          >
            <span
              style={{ fontStyle: "italic", fontWeight: "400", color: "white" }}
            >
              {task.priority + " "}
            </span>
            {task.taskName}
          </h5>
          <p className="card-text" style={{ color: "white" }}>
            {task.taskDescription}
          </p>
        </Link>
        <div>
          <ul className="list-group list-group-flush">
            {!task.completed && (
              <li
                className="list-group-item bg-dark"
                style={{ color: "#e57373", fontWeight: "600" }}
              >
                Incomplete
              </li>
            )}
            {task.completed && (
              <li
                className="list-group-item bg-dark"
                style={{ color: "#c5ffad", fontWeight: "600" }}
              >
                Complete
              </li>
            )}
            <li className="list-group-item text-white bg-dark">
              {this.getDaysLeft(task.dueDate)} Days Remaining
            </li>
            <li className="list-group-item text-white bg-dark">
              {task.subTaskCount} Subtasks
            </li>
          </ul>
          <div className="card-body">{/*buttons go here*/}</div>
        </div>
      </div>
    );

    // <tr key={task.taskId}>
    //   <td>{task.priority}</td>
    //   <td>
    //     <Link
    //       to={`/project/${this.state.projectId}/task/${task.taskId}`}
    //       style={{
    //         fontFamily: "Montserrat",
    //         color: "#c5ffad",
    //         fontWeight: "600",
    //       }}
    //     >
    //       {task.taskName}
    //     </Link>
    //   </td>
    //   <td>{task.taskDescription}</td>
    //   <td>{task.subTaskCount} Tasks</td>
    //   <td>{this.getDaysLeft(task.dueDate)} Days Left</td>
    // {!task.completed && (
    //   <td style={{ color: "#e57373", fontWeight: "600" }}>Incomplete</td>
    // )}
    // {task.completed && (
    //   <td style={{ color: "#c5ffad", fontWeight: "600" }}>Complete</td>
    // )}
    //   <td className="d-flex justify-content-end">
    //     <Link
    //       to={{
    //         pathname: `/project/${this.state.projectId}/task/${task.taskId}/edit`,
    //         state: {
    //           parentTaskId: task.parentTaskId,
    //           taskId: task.taskId,
    //           taskName: task.taskName,
    //           taskDescription: task.taskDescription,
    //           priority: task.priority,
    //           completed: task.completed,
    //           dueDate: task.dueDate,
    //           type: "edit main",
    //         },
    //       }}
    //       className="btn btn-primary btn-sm mr-2"
    //       style={{
    //         backgroundColor: "#c4ffbf",
    //         border: "none",
    //         color: "black",
    //         fontWeight: "600",
    //       }}
    //     >
    //       Edit
    //     </Link>
    //     <button
    //       onClick={() => this.handleDelete(task)}
    //       className="btn btn-danger btn-sm"
    //       style={{
    //         backgroundColor: "#ffbfbf",
    //         border: "none",
    //         color: "black",
    //         fontWeight: "600",
    //       }}
    //     >
    //       Delete
    //     </button>
    //     <button
    //       onClick={() => this.getSubtasks(task)}
    //       className="btn btn-secondary btn-sm"
    //       style={{ marginLeft: 7, fontWeight: "600", color: "black" }}
    //     >
    //       Expand
    //     </button>
    //   </td>
    // </tr>;
  };

  render() {
    return (
      <React.Fragment>
        <h2 style={{ marginBottom: 5, fontWeight: "600" }}>
          {this.state.projectName}
        </h2>
        <Link
          to={{
            pathname: `/project/${this.state.projectId}/task`,
            state: { parentTaskId: "0", type: "new main" },
          }}
          className="btn btn-primary mt-2"
          style={{
            backgroundColor: "#c4ffbf",
            border: "none",
            color: "black",
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          New Task
        </Link>
        <div className="card-group" style={{ textDecoration: "none" }}>
          {this.state.tasks.map((task) => this.renderCard(task))}
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
