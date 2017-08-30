import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { logout } from '../actions/authActionCreators';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';


class Nav extends Component {

  render() {
    return (
      <Menu inverted>
        {this.props.auth.isLoggedIn ?
          <Menu.Item name='home' as={NavLink} to='/dashboard'>
            Home
          </Menu.Item> :
          <Menu.Item name='home' as={NavLink} to='/'>
            Home
          </Menu.Item>
        }
        {this.props.auth.isLoggedIn ?
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/logout' onClick={() => this.props.logout()}>
              Logout
            </Menu.Item>
          </Menu.Menu> :
          <Menu.Menu position='right'>
            <Menu.Item name='login' as={NavLink} to='/login' >
              Login
            </Menu.Item>
          </Menu.Menu>
      }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Nav)
