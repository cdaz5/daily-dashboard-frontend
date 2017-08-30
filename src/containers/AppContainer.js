import React, { Component } from 'react';
import LandingForm from '../components/LandingForm';
import Nav from '../components/Nav';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from './DashboardContainer';





export default class AppContainer extends Component {




  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LandingForm} />
          <Route path='/dashboard' component={DashboardContainer} />
        </Switch>
      </div>
    )
  }
}
