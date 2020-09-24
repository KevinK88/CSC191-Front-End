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

  render() {
    return (
      <React.Fragment>
        <h3>{this.state.projectName}</h3>
        <Link
          to={{
            pathname: `/project/${this.state.projectId}/task`,
            state: { parentTaskId: "0", type: "new main" },
          }}
          className="btn btn-primary mt-2"
          style={{ marginBottom: 15 }}
        >
          New Task
        </Link>
        <table
          className="table"
          style={{ color: "white", textDecoration: "none" }}
        >
          <tbody>
            {this.state.tasks.map((task) => (
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
                <td>Due: {task.dueDate.toString()}</td>
                {!task.completed && (
                  <td style={{ color: "red" }}>Incomplete</td>
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
                        completed: task.completed,
                        dueDate: task.dueDate,
                        type: "edit main",
                      },
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
                <td>Tasks: {task.subTaskCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Tasks;
