import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Tasks extends Component {
  state = {
    projectId: "",
    projectName: "",
    tasks: [],
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

<<<<<<< HEAD
  async handleDeleteSub(subTask, taskId) {
    if (window.confirm("Are you sure you want to delete this Subtask?")) {
      // var newTasks = this.state.tasks;
      // var index = this.state.tasks.findIndex((x) => x.taskId === taskId);
      await axios
        .delete(`/project/${this.state.projectId}/task/${subTask.taskId}`)
        .then((res) => {})
        .catch((err) => console.log(err));
      // newTasks[index].subTasks = newTasks[index].subTasks.filter(
      //   (s) => s.taskId !== subTask.taskId
      // );
      // console.log(newTasks);
      // this.setState({ tasks: newTasks });
      setTimeout(window.history.back(), 1000);
    }
  }

=======
>>>>>>> 0b3222914cbe8445cde2813bdf9b2de6a82cfce2
  async getSubTasks(task) {
    if (!task.hasOwnProperty("subTasks")) {
      await axios
        .get(`/project/${this.state.projectId}/task/${task.taskId}`)
        .then((res) => {
          let newSubTasks = JSON.parse(JSON.stringify(res.data.subTasks));
          var newTasks = this.state.tasks;
          var index = this.state.tasks.findIndex(
            (x) => x.taskId === task.taskId
          );
          newTasks[index].subTasks = newSubTasks;
          this.setState({ tasks: newTasks });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getDaysLeft = (dueDateString) => {
    var dueDate = new Date(dueDateString);
    var today = new Date(Date.now());
    // console.log(dueDate, today);
    return Math.floor(
      (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  };

  setExpanded = (task) => {
    var newTasks = this.state.tasks;
    var index = this.state.tasks.findIndex((x) => x.taskId === task.taskId);
    if (task.hasOwnProperty("expanded")) {
      //task already has expanded property
      newTasks[index].expanded = !newTasks[index].expanded;
    } else {
      //task does not contain expanded property yet
      newTasks[index].expanded = true;
    }
    this.setState({ tasks: newTasks });
    if (this.state.tasks[index].expanded) {
      this.getSubTasks(task);
    }
  };

  renderCard = (task) => {
    let listSubTasks;
    if (task.hasOwnProperty("subTasks")) {
      listSubTasks = task.subTasks;
      console.log(listSubTasks);
    }
    return (
      <div
        key={task.taskId}
        className="card text-white bg-dark"
        style={{
          marginBottom: "15px",
          boxShadow: " 0 7px 30px -10px rgba(0,0,0,0.5)",
        }}
      >
        <Link
          to={`/project/${this.state.projectId}/task/${task.taskId}`}
          className="card-body clickable"
          style={{ textDecoration: "none" }}
        >
          <h4
            className="card-title"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              color: "#c4ffbf",
            }}
          >
            {task.taskName}
          </h4>
          <p className="card-text" style={{ color: "white" }}>
            {task.taskDescription}
          </p>
        </Link>
        <div
          className="d-flex flex-row justify-content-start align-items-center"
          style={{ borderTop: "solid 1px black", paddingTop: "10px" }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontWeight: "400",
              color: "white",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Priority {task.priority + " "}
          </div>
          {!task.completed && (
            <div
              className="bg-dark card-text"
              style={{
                color: "#e57373",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              Incomplete
            </div>
          )}
          {task.completed && (
            <div
              className="bg-dark "
              style={{
                color: "#c5ffad",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              Complete
            </div>
          )}
          <div className="text-white bg-dark" style={{ marginRight: "20px" }}>
            {this.getDaysLeft(task.dueDate)} Days Left
          </div>
          <div className="text-white bg-dark">{task.subTaskCount} Subtasks</div>
        </div>
        <div className="card-body d-flex flex-row justify-content-start">
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

        {listSubTasks && task.expanded && (
          <div
            className="d-flex flex-column"
            style={{ margin: "0px 10px 20px 20px" }}
          >
            {this.renderSubTasks(task)}
          </div>
        )}
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

  renderSubTasks = (task) => {
    const listItems = task.subTasks.map((subTask) => (
      <Link
        to={`/project/${this.state.projectId}/task/${subTask.taskId}`}
        style={{
          fontFamily: "Montserrat",
          color: "white",
          textDecoration: "none",
        }}
        className="d-flex flex-row justify-content-between clickable"
<<<<<<< HEAD
        key={subTask.taskId}
=======
>>>>>>> 0b3222914cbe8445cde2813bdf9b2de6a82cfce2
      >
        <p className="p-2" style={{ color: "#c5ffad", fontWeight: "600" }}>
          {subTask.taskName}
        </p>
<<<<<<< HEAD
        <p className=" p-2">{subTask.taskDescription}</p>
        <p className="ml-auto p-2">
          {this.getDaysLeft(subTask.dueDate)} Days Left
        </p>
=======
        <p className="mr-auto p-2">{subTask.taskDescription}</p>
        <p className="p-2">{this.getDaysLeft(subTask.dueDate)} Days Left</p>
>>>>>>> 0b3222914cbe8445cde2813bdf9b2de6a82cfce2
        <p className="p-2">{subTask.subTaskCount} Tasks</p>

        {!subTask.completed && (
          <p className="p-2" style={{ color: "#e57373", fontWeight: "600" }}>
            Incomplete
          </p>
        )}
        {subTask.completed && (
          <p className="p-2" style={{ color: "#c5ffad", fontWeight: "600" }}>
            Complete
          </p>
        )}
        <div className="p-2">
          <Link
            to={{
              pathname: `/project/${this.state.projectId}/task/${subTask.taskId}/edit`,
              state: {
                parentTaskId: subTask.parentTaskId,
                taskId: subTask.taskId,
                taskName: subTask.taskName,
                taskDescription: subTask.taskDescription,
                priority: subTask.priority,
                completed: subTask.completed,
                dueDate: subTask.dueDate,
                type: "edit main",
              },
            }}
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: "#c4ffbf",
              border: "none",
              color: "black",
              fontWeight: "600",
<<<<<<< HEAD
=======
              paddingBottom: 0,
>>>>>>> 0b3222914cbe8445cde2813bdf9b2de6a82cfce2
            }}
          >
            Edit
          </Link>
        </div>
<<<<<<< HEAD
        <div className="p-2">
          <button
            onClick={() => this.handleDeleteSub(subTask, task.taskId)}
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
        </div>
=======
>>>>>>> 0b3222914cbe8445cde2813bdf9b2de6a82cfce2
      </Link>
    ));

    return listItems;
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
        <div className="list-group-flush" style={{ textDecoration: "none" }}>
          {this.state.tasks.map((task) => this.renderCard(task))}
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
