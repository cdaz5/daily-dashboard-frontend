import React, { Component } from 'react';
// import LoginFB from './LoginFB'
import { Grid, Button, Form, Message, Input } from 'semantic-ui-react';
import { login } from '../actions/authActionCreators';
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state)
    this.setState({email: '', password: ''})
  }

  renderErrorMessage = () => {
     if (!!this.props.auth.errors && this.props.auth.errors.length > 0) {
       const items = this.props.auth.errors.map(error => error)
      return (<Message
        color='red'
        className='loginSignupMessage'
        header='Apologies!'
        list={items}
      />)
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='parallax height'>
        <Grid divided>
          <Grid.Row centered columns={1}>
            <Grid.Column centered width={4}>
              <div className='login'>hurry up and login already!</div>
              {this.renderErrorMessage()}
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    size='huge'
                    type='text'
                    name='email'
                    placeholder='Enter Email'
                    value={this.state.email}
                    onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <Input
                    size='huge'
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={this.state.password}
                    onChange={this.handleChange} />
                </Form.Field>
                <Button primary type='submit' size='huge'>Log In</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { login })(Login)
