import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import ArticleCard from '../components/ArticleCard';
import { fetchedArticles } from '../actions/fetchNewsSourcesActionCreators'



class DashboardContainer extends Component {

  componentDidMount = () => {
    this.props.auth.currentUser.outlets.map((outlet) => {
      this.props.fetchedArticles(outlet)
    })
  }


  render() {
    return (
      <Grid centered divided>
        <Grid.Row centered columns={1}>
          <Grid.Column centered width={10}>
            <Segment className='dashboardHeader'>Articles</Segment>
            {this.props.articles ?
              <ArticleCard /> : null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    sources: state.news.sources,
    images: state.news.images,
    articles: state.news.articles,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchedArticles })(DashboardContainer)
