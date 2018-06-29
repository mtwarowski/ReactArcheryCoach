import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadBowsAsync, deleteBowByIdAsync } from '../../actions/equipment'

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'

import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

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

class Bows extends Component {

  componentDidMount() {
    this.props.loadBowsAsync();
  }

  render() {
    return (
      <div style={styles.cardContainer} className="row">
        {!this.props.bows ? <div>Unable to load bows.</div>
          : this.props.bows.map((bow, index) => (
            <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <Card style={styles.card}>
                <CardMedia overlay={<CardTitle title={bow.name} subtitle={bow.brand} />}>
                  {
                    bow.image ?
                      <img src={bow.image} alt="" />
                      : <img src="bow.png" alt="" />
                  }
                </CardMedia>
                <CardText>
                  <div><span>{bow.description}</span></div>
                </CardText>
                <CardText>
                  {bow.sightMarks ? bow.sightMarks.map((sighMark) => (<div><span></span>{sighMark.value}<span> at </span><span>{sighMark.distance}</span></div>)) : ''}
                </CardText>
                <CardText>
                  <div><span>BowType:</span><span>{bow.bowType}</span></div>
                  <div><span>DrawWeight:</span><span>{bow.drawWeight}</span></div>
                  <div><span>BraceHeight:</span><span>{bow.braceHeight}</span></div>
                  <div><span>BowString:</span><span>{bow.bowString}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => this.props.deleteBowByIdAsync(bow.key)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }

        <LinkFloatingActionButton url="/bows/new" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    bows: state.equipment.bows
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadBowsAsync,
  deleteBowByIdAsync
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bows)


    // name: string;
    // brand: string;
    // size: number;
    // description: string;
    // sightMarks: BowSightMark[];
    // bowType: string;

    // drawWeight: number;
    // braceHeight: string;
    // bowString: string;
    // image: string; (bytes)