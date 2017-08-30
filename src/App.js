import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import LandingForm from './components/LandingForm';
import DashboardContainer from './containers/DashboardContainer';
import Authorize from './Authorize';
import Login from './components/Login'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path='/' component={LandingForm} />
          <Route path='/dashboard' component={Authorize(DashboardContainer)} />
          <Route path='/logout' render={() => <Redirect to='/' />}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default App;
