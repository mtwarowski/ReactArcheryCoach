import React, { Component } from 'react';

import PaginationBar from '../../components/PaginationBar.js'
import { Link } from 'react-router-dom';
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

import { loadScoresPageAsync } from '../../actions/scores'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getTimeTextFromTimeSpam } from '../../helpers/datetime'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import Avatar from 'material-ui/Avatar/Avatar';

const styles = {
  cardContainer: {
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },      
  card: {
    margin: 5,
  }
}

class Scores extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedPageChanged = this.handleSelectedPageChanged.bind(this);
    this.handleDeleteScoreById = this.handleDeleteScoreById.bind(this);
  }

  componentDidMount() {
    this.handleSelectedPageChanged(1);
  }

  handleSelectedPageChanged = (pageNumber) => {
    this.props.loadScoresPageAsync({
      pageNumber: pageNumber,
      pageSize: 20
    });
  }

  handleDeleteScoreById(scoreId){
    
  }

  render() {
    return (
      <div className="mainContainer">
        <PaginationBar pageNumber={this.props.pageNumber} pageSize={this.props.pageSize} itemCount={this.props.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged} />

        <div style={styles.cardContainer} className="row">
          {!this.props.scores ? <div>Unable to load scores.</div>
            : this.props.scores.map((score, index) => (
              <div key={score.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <Card style={styles.card}>
                  <CardHeader
                    title={'of ' + score.maxValue}
                    subtitle={getTimeTextFromTimeSpam(score.timeStamp)}
                    avatar={
                      <Avatar>{score.currentValue}</Avatar>
                    }/>
                  <CardText>
                    <div><span>{score.name} {getTimeTextFromTimeSpam(score.timeStamp)}</span></div>
                  </CardText>
                  <CardActions>   
                    <Link to={'/scores/' + score.id} >               
                      <IconButton><Edit /></IconButton>
                    </Link>
                    <IconButton onClick={() => this.handleDeleteScoreById(score.id)}><Delete /></IconButton>
                  </CardActions>
                </Card>
              </div>
            ))
          }
        </div>

        <LinkFloatingActionButton url="/scores/new" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let newProps = {
    ...props,
    pageSize: state.scores.page.pageSize,
    pageNumber: state.scores.page.pageNumber,
    itemCount: state.scores.page.itemCount,
    scores: state.scores.page.data
  }
  return newProps;
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadScoresPageAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scores)
