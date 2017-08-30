import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';


class OutletCard extends Component {

  state = {
    isDisabled: false
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

  // <Card raised>
  //   <Image centered={true} size='small' src={source.src} />
  //   <Card.Content>
  //     <Card.Header>
  //       {source.name}
  //     </Card.Header>
  //     <Card.Description>
  //       <Segment inverted color='olive'>
  //         <Checkbox toggle label='Add Please!' name={source} onChange={(event, element, source) => this.props.onChange(event, element, source)}/>
  //       </Segment>
  //     </Card.Description>
  //   </Card.Content>
  // </Card>

  // label={{ as: 'a', color: 'black', content:`${source.name}`, corner: 'left' }}


  onClickDisabled = () => {
    this.setState({
      isDisabled: !this.state.isDisabled
    })
  }


  render() {
    return (
      <Card
        onClick={(event, data) => this.props.onChange(event, data, this.state)}
        className='sourcesCard'
      >
          <Image
            disabled={this.state.isDisabled}
            src={this.props.source.src}
            label={{ className: 'cardLabel', content: `${this.props.source.name}`, size: 'big', color: 'black', attached: 'bottom'}}
            alt={this.props.source.api_id}
            onClick={this.onClickDisabled}
           />
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sources: state.news.sources,
    images: state.news.images
  }
}

export default connect(mapStateToProps)(OutletCard)
