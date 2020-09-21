import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./app.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Tasks from "./components/tasks";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ProjectForm from "./components/projectForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import User from "./components/user";
import TaskForm from "./components/taskForm";
import SubTasks from "./components/subTasks";

axios.defaults.baseURL =
  "https://us-central1-project-manager-4e83a.cloudfunctions.net/api";

export function isAuthenticated() {
  var token = localStorage.token;
  let authenticated;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      authenticated = false;
    } else {
      authenticated = true;
    }
    axios.defaults.headers.common["Authorization"] = token;
  }
  return authenticated;
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/signup" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" />
            <Route path="/user" component={User} />
            <Route path="/project/new" component={ProjectForm} />
            <Route path="/project/:projectId" exact component={Tasks} />
            <Route
              path="/project/:projectId/edit/:projectName"
              exact
              component={ProjectForm}
            />
            <Route
              path="/project/:projectId/task/:taskId"
              exact
              component={SubTasks}
            />
            <Route path="/project/:projectId/task" exact component={TaskForm} />
            <Route
              path="/project/:projectId/task/:taskId/edit"
              exact
              component={TaskForm}
            />
            <Route
              path="/project/:projectId/task/:taskId/subtask"
              exact
              component={TaskForm}
            />
            <Route path="/not-found" component={NotFound}></Route>
            {!isAuthenticated() && <Redirect from="/" exact to="/login" />}
            {isAuthenticated() && <Redirect from="/" exact to="/user" />}
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
