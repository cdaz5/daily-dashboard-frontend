import React, { Component } from 'react';
import { Image, Segment, Icon, Form, Input, Grid, Button, Card, Message } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp, outletsNeededErrorMessage, userExistFB, userExistGoogle } from '../actions/authActionCreators';
import { fetchedSources, fetchingSources, fetchedImages, fetchingArticles, fetchedArticles } from '../actions/fetchNewsSourcesActionCreators';
import OutletCard from './OutletCard';
import { Link } from 'react-router-dom';
import FacebookProvider, { Login } from 'react-facebook';
import GoogleLogin from 'react-google-login';

const FB_ID = process.env.REACT_APP_FB_ID
const GOOG_ID = process.env.REACT_APP_GOOGLE_ID


class LandingForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    outlets: [],
  }

  componentWillMount = () => {
    this.props.fetchedImages()
    this.props.fetchedSources()
  }

  onDateChange = (date) => {
    this.setState({
      birthday: date
    })
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.outlets.length <= 0) {
      this.props.outletsNeededErrorMessage()
    } else {
      // debugger
      this.props.signUp(this.state)
    }
  }

  onImageSelect = (event, data, state) => {
    if (state.isDisabled) {
      const newOutlets = this.state.outlets.filter(outlet => outlet !== event.target.alt)
      this.setState({
        outlets: newOutlets
      })
    }
    if (!this.state.outlets.includes(event.target.alt)) {
      this.setState({
        outlets: [event.target.alt, ...this.state.outlets]
      })
    }
  }

  mapImagesToSource = () => {
    for (let i = 0; i < this.props.sources.length; i++) {
      for (let j = 0; j < this.props.images.length; j++) {
        if (this.props.sources[i]['name'] === this.props.images[j]['name']) {
          this.props.sources[i]['src'] = this.props.images[j]['src']
        }
      }
    }
    return this.props.sources
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

  handleResponse = (data) => {
      this.props.userExistFB(data, this.state.outlets)
  }

  handleError = (error) => {
    this.setState({ error });
  }

  responseGoogle = (response) => {
      this.props.userExistGoogle(response, this.state.outlets)
  }


  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Grid divided>
          <Grid.Row centered columns={1}>
            <Grid.Column centered width={10}>
              <Image size='massive' src='https://blogs.vmware.com/networkvirtualization/files/2017/01/News-Image.jpg' />
              <div>powered by <Link to='https://newsapi.org/'>NewsAPI.org</Link></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column centered width={10}>
              {this.renderErrorMessage()}
              <span size='huge' className='socialHolder'>Signup or Login With:
                <FacebookProvider appId={FB_ID}>
                  <Login
                    scope="email"
                    onResponse={this.handleResponse.bind(this)}
                    onError={this.handleError.bind(this)}
                  >
                  <Icon className='socialFB' color='blue' name='facebook official' size='huge'/>
                  </Login>
                </FacebookProvider>
                <GoogleLogin
                  clientId={GOOG_ID}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  tag='a'
                  className='google'
                >
                  <Icon className='socialGoogle' color='red' name='google plus square' size='huge'/>
                </GoogleLogin>
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column centered width={10}>
              <Segment className='dashboardHeader'>Choose Your Sources</Segment>
              <Card.Group itemsPerRow={4} size='small'>
                {this.mapImagesToSource().map((source, idx) =>
                  <OutletCard
                    key={idx}
                    source={source}
                    onChange={this.onImageSelect}
                  />
                )}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    sources: state.news.sources,
    images: state.news.images,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { signUp, fetchedSources, fetchingSources, fetchedImages, fetchingArticles, fetchedArticles, outletsNeededErrorMessage, userExistFB, userExistGoogle })(LandingForm)
