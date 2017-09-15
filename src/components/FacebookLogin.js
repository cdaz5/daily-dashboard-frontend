import React, { Component} from 'react';
import FacebookProvider, { Login } from 'react-facebook';
import { Icon } from 'semantic-ui-react';

const APP_ID = process.env.REACT_APP_FB_ID

export default class FBLogin extends Component {
  handleResponse = (data) => {    
  }

  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <FacebookProvider appId='114136192603482'>
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <Icon className='social' color='blue' name='facebook official' size='big'/>
        </Login>
      </FacebookProvider>
    );
  }
}
