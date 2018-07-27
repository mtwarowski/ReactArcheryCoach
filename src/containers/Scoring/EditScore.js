import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateScoreAsync, loadScoreByIdAsync } from '../../actions/scores'

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { navigateTo } from '../../helpers/navigation'
import { EndPoint } from './TargetFace/EndPoint'

const RoundEndSummary = ({endNo, arrowsPairEnd, endPoints}) => {
  let arrowsSummaryRow = [];
  for (let arrowNo = 0; arrowNo < arrowsPairEnd; arrowNo++) {
    let endPoint = endPoints ? endPoints[arrowNo] : null;
    arrowsSummaryRow.push(<EndPoint key={arrowNo} point={endPoint}  />);
  }
  return <div><div>{'End No: ' + endNo}</div>{arrowsSummaryRow}</div>;
}

class EditScore extends Component {
  constructor(props) {
    super(props);

    this.handleRoundEndClick = this.handleRoundEndClick.bind(this);
  }

  componentDidMount() {
    this.props.loadScoreByIdAsync(this.props.scoreId);
  }

  handleRoundEndClick(roundNo, endNo){    
    if(roundNo !== undefined && endNo !== undefined){
      navigateTo(`./scores/${this.props.scoreId}/${roundNo}/${endNo}`);
    }
  }

  tryGetEndPoints(roundNo, endNo){
    return this.props.scoreResults && this.props.scoreResults[roundNo] && this.props.scoreResults[roundNo][endNo] 
          ? this.props.scoreResults[roundNo][endNo]
          : null;
  }

  getEndsSummary(round, roundNo) {
    let endsSummaryRows = [];
    for (let endNo = 0; endNo < round.numberOfEnds; endNo++) {
      endsSummaryRows.push(<React.Fragment key={endNo}>
                            <span onClick={() => this.handleRoundEndClick(roundNo, endNo)}>
                              <RoundEndSummary endNo={endNo + 1} arrowsPairEnd={round.arrowsPairEnd} endPoints={this.tryGetEndPoints(roundNo, endNo)}  />
                            </span>
                          </React.Fragment>);
    }
    return <div>{endsSummaryRows}</div>;
  }

  render() {
    return (this.props.score ? 
        <Card>
          <CardTitle title={this.props.score.name} />
          {this.props.score.tournamentRound.rounds.map((round, index) => <div key={index}>
            <CardText>
              {round.distanceValue + "" + round.distanceSymbol }
            </CardText>
            
            {this.getEndsSummary(round, index)}
          </div>) }

        </Card>
      : "no data"
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    scoreId: props.match.params.id,
    score: state.scores.score,
    scoreResults: state.scores.score ? state.scores.score.results : []
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateScoreAsync,
  loadScoreByIdAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScore)
