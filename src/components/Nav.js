import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { logout } from '../actions/authActionCreators';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';


class Nav extends Component {

  render() {
    return (
      <Menu borderless inverted className='navTitle'>
        {this.props.auth.isLoggedIn ?
          <Menu.Item className='navTitle' as={NavLink} to='/dashboard'>
            Daily-Dasher
          </Menu.Item> :
          <Menu.Item className='navTitle' as={NavLink} to='/'>
            Daily-Dasher
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
