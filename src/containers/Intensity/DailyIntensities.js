import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadIntensitiesByDayAsync } from '../../actions/intensities'

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { navigateTo } from '../../helpers/navigation'

import { LoadingIndicator } from '../../components/LoadingIndicator'


class DailyIntensities extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadIntensitiesByDayAsync(this.props.intensityDay);
  }

  render() {
    return (this.props.intensityDay ? 
        <Card>
          <CardTitle title={"Day: " + this.props.intensityDay} />
          {this.props.practices.map((practice, index) => <div key={index}>
            <CardText>
            </CardText>
          </div>) }
        </Card>
      : "no data"
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    intensityDay: props.match.params.date,
    selectedDate: state.intensities.daily.date,
    scores: state.intensities.daily.scores,
    practices: state.intensities.daily.practices,
    isLoading: state.intensities.daily.isLoading,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadIntensitiesByDayAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyIntensities)
