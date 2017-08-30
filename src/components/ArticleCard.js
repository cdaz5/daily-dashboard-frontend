import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';




class ArticleCard extends Component {

  generateArticleCards = () => {
    return this.props.articles.map((source) => {
      return source.articles.map((article) => {
        return (
          <Card className='articlesCard'>
            <Image
              className='articlesCardImage'
              src={article.urlToImage}
              label={{ as: 'a', color: 'black', content: `${source.source}`, ribbon: true, size: 'large' }}
            />
            <Card.Content>
              <Card.Header>
                <Link className='articleLink' to={article.url} target='_blank'>{article.title}</Link>
              </Card.Header>
              <Card.Meta>
                <div>Author: {article.author}</div>
                <div>Published: {moment(article.publishedAt).fromNow()}</div>
              </Card.Meta>
              <Card.Description>
                {article.description}
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })
    })
  }
  render() {
    return (

        <Card.Group itemsPerRow={3} size='small'>
          {this.generateArticleCards()}
        </Card.Group>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    sources: state.news.sources,
    articles: state.news.articles
  }
}

export default connect(mapStateToProps)(ArticleCard)
