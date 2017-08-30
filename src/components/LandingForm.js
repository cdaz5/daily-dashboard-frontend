import React, { Component } from 'react';
import { Image, Segment, Form, Input, Grid, Button, Card, Message } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../actions/authActionCreators';
import { fetchedSources, fetchingSources, fetchedImages, fetchingArticles, fetchedArticles } from '../actions/fetchNewsSourcesActionCreators';
import OutletCard from './OutletCard';
import { Link } from 'react-router-dom';

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
    this.props.signUp(this.state)
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


  render() {
    return (
      <Form onSubmit={this.onSubmit}>
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
              <Input size='huge' placeholder='Enter your Name' name='name' onChange={this.onInputChange}/>
              <Input size='huge' placeholder='Enter your Email' name='email' onChange={this.onInputChange}/>
              <Input size='huge' placeholder='Enter your Password' name='password' onChange={this.onInputChange}/>
              {this.state.outlets.length > 0 ?
                <Button size='huge' primary>Signup!</Button> : null
              }
              <div>already a member? <Link to='/login'>Login</Link></div>
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

export default connect(mapStateToProps, { signUp, fetchedSources, fetchingSources, fetchedImages, fetchingArticles, fetchedArticles })(LandingForm)
