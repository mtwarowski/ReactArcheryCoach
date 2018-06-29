import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadArrowsAsync, deleteArrowsByIdAsync } from '../../actions/equipment'

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'; 
import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton';

const styles = {
  cardContainer: {
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  card: {
    margin: 10,
  }
}

class Arrows extends Component {

  componentDidMount() {
    this.props.loadArrowsAsync();
  }

  render() {
    return (
      <div style={styles.cardContainer} className="row">
        {!this.props.arrows ? <div>Unable to load arrows.</div>
          : this.props.arrows.map((arrow, index) => (
            <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <Card style={styles.card}>
                <CardMedia overlay={<CardTitle title={arrow.name} subtitle={arrow.vanes} />}>
                  {
                    arrow.image ?
                      <img src={arrow.image} alt="" />
                      : <img src="bow.png" alt="" />
                  }
                </CardMedia>
                <CardText>
                  <div><span>{arrow.comment}</span></div>
                </CardText>
                <CardText>
                  <div><span>shaftType:</span><span>{arrow.shaftType}</span></div>
                  <div><span>nocks:</span><span>{arrow.nocks}</span></div>
                  <div><span>amoLengthInCm:</span><span>{arrow.amoLengthInCm}</span></div>
                  <div><span>diameterInMm:</span><span>{arrow.diameterInMm}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => this.props.deleteArrowsByIdAsync(arrow.key)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }

        <LinkFloatingActionButton url="/arrows/new" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    arrows: state.equipment.arrows
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadArrowsAsync,
  deleteArrowsByIdAsync
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Arrows)
