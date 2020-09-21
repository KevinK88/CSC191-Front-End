import React, { Component } from "react";
import axios from "axios";

class TaskForm extends Component {
  state = {
    taskName: "",
    taskDescription: "",
    priority: 0,
    dueDate: {},
    projectId: "",
    parentTaskId: "",
    completed: "",
    taskId: "",
    type: "",
  };

  constructor(props) {
    super(props);

    if (this.props.location.state.taskId) {
      //if editing an existing task
      this.state = {
        projectId: this.props.match.params.projectId,
        taskName: this.props.location.state.taskName,
        taskDescription: this.props.location.state.taskDescription,
        priority: parseInt(this.props.location.state.priority, 10),
        parentTaskId: this.props.location.state.parentTaskId,
        taskId: this.props.location.state.taskId,
        completed: this.props.location.state.completed.toString(),
        dueDate: { seconds: 159839020, nanoseconds: 38500000 },
        type: this.props.location.state.type,
      };
    } else {
      //if creating a new task

      this.state = {
        projectId: this.props.match.params.projectId,
        parentTaskId: this.props.location.state.parentTaskId,
        completed: "false",
        taskName: "",
        taskDescription: "",
        priority: 0,
        type: this.props.location.state.type,
      };
    }
  }

  componentDidMount() {
    // console.log(this.state);
    if (this.state.type === "edit main") {
      this.setState({ completed: this.state.completed });
    } else if (this.state.type === "edit sub") {
      this.setState({ completed: this.state.completed });
    } else if (this.state.type === "new sub") {
      // console.log("new sub", this.state);
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
    if (this.state.type === "new main") {
      axios
        .post(`/project/${this.state.projectId}/task`, {
          projectId: this.state.projectId,
          taskName: this.state.taskName,
          taskDescription: this.state.taskDescription,
          priority: parseInt(this.state.priority, 10),
          parentTaskId: this.state.parentTaskId,
        })
        .then((res) =>
          this.props.history.push(
            `/project/${this.props.match.params.projectId}`
          )
        )
        .catch((err) => console.log(err));
    } else if (this.state.type === "edit main") {
      axios
        .post(
          `/project/${this.state.projectId}/task/${this.state.taskId}/edit`,
          {
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            priority: parseInt(this.state.priority, 10),
            completed: "true" === this.state.completed,
            dueDate: this.state.dueDate,
          }
        )
        .then((res) =>
          this.props.history.push(
            `/project/${this.props.match.params.projectId}`
          )
        )
        .catch((err) => console.log(err));
    } else if (this.state.type === "new sub") {
      axios
        .post(
          `/project/${this.state.projectId}/task/${this.state.parentTaskId}/subtask`,
          {
            projectId: this.state.projectId,
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            priority: parseInt(this.state.priority, 10),
            parentTaskId: this.state.parentTaskId,
          }
        )
        .then((res) =>
          this.props.history.push(
            `/project/${this.props.match.params.projectId}/task/${this.state.parentTaskId}`
          )
        )
        .catch((err) => console.log(err));
    } else if (this.state.type === "edit sub") {
      axios
        .post(
          `/project/${this.state.projectId}/task/${this.state.taskId}/edit`,
          {
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            priority: parseInt(this.state.priority, 10),
            completed: "true" === this.state.completed,
            dueDate: this.state.dueDate,
          }
        )
        .then((res) =>
          this.props.history.push(
            `/project/${this.props.match.params.projectId}/task/${this.state.parentTaskId}`
          )
        )
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <h1>Task Details</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              id="taskName"
              name="taskName"
              type="text"
              className="form-control"
              value={this.state.taskName}
              onChange={this.handleChange}
            />
            <label htmlFor="taskDescription">Task Description</label>
            <input
              id="taskDescription"
              name="taskDescription"
              type="text"
              className="form-control"
              value={this.state.taskDescription}
              onChange={this.handleChange}
            />
            <label htmlFor="priority">Priority</label>
            <input
              id="priority"
              name="priority"
              type="number"
              className="form-control"
              value={this.state.priority}
              onChange={this.handleChange}
            />
            <label htmlFor="completed">Status</label>
            <select
              id="completed"
              name="completed"
              className="form-control"
              value={this.state.completed}
              onChange={this.handleChange}
            >
              <option value="true">Complete</option>
              <option value="false">Incomplete</option>
            </select>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TaskForm;
