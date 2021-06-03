import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProfileUser from './pages/ProfileUser';
import Admin from './pages/Admin';
import AdmPostPage from './pages/AdmPostPage';
import { auth } from './firebase/firebase';
import './App.css'
import OtherUser from './pages/OtherUser';
import MessagesPage from './pages/MessagesPage';

function PublicRoute ({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}


class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

render() {
  return this.state.loading === true ? <h2>Loading...</h2> : (
    <Router>

    <Switch>
    <PublicRoute path="/admin/post" exact authenticated={this.state.authenticated}  component={AdmPostPage}></PublicRoute>
    <PublicRoute path="/admin" authenticated={this.state.authenticated} component={Admin}></PublicRoute>
    <Route exact path="/" component={ HomePage }></Route>
    <PrivateRoute path="/dashboard" authenticated={this.state.authenticated} component={Dashboard}></PrivateRoute>
    <PrivateRoute path="/userprofile" authenticated={this.state.authenticated} component={ProfileUser}></PrivateRoute>
    <PrivateRoute path="/users/" authenticated={this.state.authenticated} component={OtherUser}></PrivateRoute>
    <PrivateRoute path="/users/:id" authenticated={this.state.authenticated} component={OtherUser}></PrivateRoute>
    <PrivateRoute path="/messages/:id" authenticated={this.state.authenticated} component={MessagesPage}></PrivateRoute>
    <PrivateRoute path="/messages" authenticated={this.state.authenticated} component={MessagesPage}></PrivateRoute>
  </Switch>
     
    </Router>
    )
  }
}

export default App

  
    //   <Router>
    //     <Switch>
    //       <Route path='/' exact component={HomePage} />
    //     </Switch>
    //     <Switch>
    //       <Route path='/dashboard' exact component={Dashboard} />
    //     </Switch>
    //     <Switch>
    //       <Route path='/admin' exact component={Admin} />
    //     </Switch>
    //     <Switch>
    //       <Route path='/userprofile' exact component={ProfileUser}/>
    //     </Switch>
    //     <Switch>
    //     <Route path='/training-page' exact component={HomeTrain}/>
    //   </Switch>
    //   <Switch>
    //   <Route path='/admin/post' exact component={AdmPostPage}/>
    // </Switch>
    //   </Router>
  