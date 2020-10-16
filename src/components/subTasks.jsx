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
    tasks: [],
    subTasks: [],
    expanded: false,
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
          tasks: res.data.subTasks,
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
            tasks: res.data.subTasks,
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
      const tasks = this.state.tasks.filter((t) => t.taskId !== task.taskId);
      this.setState({ tasks });
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
    console.log(this.state.tasks, this.state.expanded);
  };

  setExpanded = (task) => {};

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
          <div className="card-body">
            <Link
              to={{
                pathname: `/project/${this.state.projectId}/task/${task.taskId}/edit`,
                state: {
                  parentTaskId: task.parentTaskId,
                  taskId: task.taskId,
                  taskName: task.taskName,
                  taskDescription: task.taskDescription,
                  priority: task.priority,
                  completed: task.completed,
                  dueDate: task.dueDate,
                  type: "edit main",
                },
              }}
              className="btn btn-primary btn-sm mr-2"
              style={{
                backgroundColor: "#c4ffbf",
                border: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Edit
            </Link>
            <button
              onClick={() => this.handleDelete(task)}
              className="btn btn-danger btn-sm"
              style={{
                backgroundColor: "#ffbfbf",
                border: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => this.setExpanded(task)}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: "#ffffff",
                marginLeft: 7,
                fontWeight: "600",
                color: "black",
                border: "none",
              }}
            >
              Expand
            </button>
          </div>
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
    //         fontWeight: "600",
    //         color: "#c5ffad",
    //       }}
    //     >
    //       {task.taskName}
    //     </Link>
    //   </td>
    //   <td>{task.taskDescription}</td>

    //   <td>{task.subTaskCount} Tasks</td>
    //   <td>{this.getDaysLeft(task.dueDate)} Days Left</td>
    //   {!task.completed && (
    //     <td style={{ color: "#e57373", fontWeight: "600" }}>Incomplete</td>
    //   )}
    //   {task.completed && (
    //     <td style={{ color: "#c5ffad", fontWeight: "600" }}>Complete</td>
    //   )}
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
    //           dueDate: task.dueDate,
    //           completed: task.completed,
    //           type: "edit sub",
    //         }, //
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
        <div
          className="card text-white bg-dark"
          style={{ marginBottom: "12px" }}
        >
          <div className="card-body">
            <h2
              className="card-title"
              style={{ marginBottom: 2, fontWeight: "600" }}
            >
              {this.state.taskName}
            </h2>
            <p style={{ color: "#c9c9c9", marginBottom: 5 }}>
              {this.state.taskDescription}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            {!this.state.completed && (
              <li
                className="list-group-item bg-dark"
                style={{ color: "#e57373", fontWeight: "600" }}
              >
                Incomplete
              </li>
            )}
            {this.state.completed && (
              <li
                className="list-group-item bg-dark"
                style={{ color: "#c5ffad", fontWeight: "600" }}
              >
                Complete
              </li>
            )}
            <li
              className="list-group-item bg-dark"
              style={{ marginBottom: 5, fontFamily: "Montserrat" }}
            >
              <span style={{ fontWeight: "600" }}>
                {this.getDaysLeft(this.state.dueDate)} days{" "}
              </span>{" "}
              until due on{" "}
              {
                <span style={{ fontWeight: "600" }}>
                  {this.state.dueDate.toString()}
                </span>
              }
            </li>
          </ul>
          <div className="card-body">
            {" "}
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
              style={{
                backgroundColor: "#c4ffbf",
                border: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Edit
            </Link>
            <button
              onClick={() => this.handleDeleteMain()}
              className="btn btn-danger btn-sm"
              style={{
                backgroundColor: "#ffbfbf",
                border: "none",
                color: "black",
                fontWeight: "600",
              }}
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
              style={{
                backgroundColor: "#c4ffbf",
                border: "none",
                color: "black",
                marginLeft: 15,
                marginBottom: 10,
                fontWeight: "600",
              }}
            >
              New Subtask
            </Link>{" "}
          </div>
        </div>

        {/* <Link
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
          style={{
            backgroundColor: "#c4ffbf",
            border: "none",
            color: "black",
            fontWeight: "600",
          }}
        >
          Edit
        </Link>
        <button
          onClick={() => this.handleDeleteMain()}
          className="btn btn-danger btn-sm"
          style={{
            backgroundColor: "#ffbfbf",
            border: "none",
            color: "black",
            fontWeight: "600",
          }}
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
          style={{
            backgroundColor: "#c4ffbf",
            border: "none",
            color: "black",
            marginLeft: 15,
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          New Subtask
        </Link> */}
        <div className="card-group" style={{ textDecoration: "none" }}>
          {this.state.tasks.map((task) => this.renderCard(task))}
        </div>
        {/* {this.state.expanded && (
          <table
            className="table"
            style={{ color: "white", textDecoration: "none" }}
          >
            <tbody>
              {this.state.subTasks.map((subTask) => this.renderRow(subTask))}
            </tbody>
          </table>
        )} */}
      </React.Fragment>
    );
  }
}

export default SubTasks;
