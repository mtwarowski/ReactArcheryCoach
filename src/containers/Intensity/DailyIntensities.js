import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPracticeByDateAsync } from '../../actions/practices'
import { loadScoreByDateAsync } from '../../actions/scores'

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { navigateTo } from '../../helpers/navigation'
import { dayTextToDate, getDayText } from '../../helpers/datetime'

import { LoadingIndicator } from '../../components/LoadingIndicator'
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

import NextWeek from 'material-ui/svg-icons/content/next-week';

class DailyIntensities extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let dateBy = getDayText(this.props.intensityDay);
    this.props.loadPracticeByDateAsync(dateBy);
    this.props.loadScoreByDateAsync(dateBy);
  }

  addDays(date, days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  render() {
    return (this.props.intensityDay ? 
      <LoadingIndicator isLoading={this.props.isLoading} >
        <Card>
          <CardTitle title={"Day: " + getDayText(this.props.intensityDay)} />
          {this.props.practices.map((practice, index) => <div key={index}>
            <CardText>
            </CardText>
          </div>) }          
        </Card>

        <LinkFloatingActionButton url={"/Intensities/" + getDayText(this.addDays(this.props.intensityDay, 1))} >
          <NextWeek />
        </LinkFloatingActionButton>        
      </LoadingIndicator>
      : "no data"
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    intensityDay: dayTextToDate(props.match.params.date),
    selectedDate: state.intensities.daily.date,
    scores: state.intensities.daily.scores,
    practices: state.intensities.daily.practices,
    isLoading: state.intensities.daily.isLoading,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadPracticeByDateAsync,
  loadScoreByDateAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyIntensities)
