import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProfileUser from './pages/ProfileUser';
import HomeTrain from './trial/homeTrain'

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
        </Switch>
        <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
        </Switch>
        <Switch>
          <Route path='/admin' exact component={Admin} />
        </Switch>
        <Switch>
          <Route path='/userprofile' exact component={ProfileUser}/>
        </Switch>
        <Switch>
        <Route path='/training-page' exact component={HomeTrain}/>
      </Switch>
      </Router>
    </>
  );
}
export default App;