import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TargetFace } from './TargetFace'
import { updateScoreAsync, loadScoreByIdAsync } from '../../actions/scores'
import Snackbar from 'material-ui/Snackbar'
import ArrowPointBar from './TargetFace/ArrowPointBar'
import ArrowNumberSelectorBar from './TargetFace/ArrowNumberSelectorBar'
import TargetFaceControlBar from './TargetFace/TargetFaceControlBar'

class ScoreSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            end: [],
            showMessage: false,
            message: ''
        };
    }

    componentDidMount() {
        this.props.score || this.props.loadScoreByIdAsync(this.props.scoreId);

        this.setState({ end: this.props.scoreEnd || [] });
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.scoreEnd !== prevProps.scoreEnd && this.setState({ end: this.props.scoreEnd || [] });
    }

    getEmptyEndsResults(endsNo) {
        let ends = [];

        for (let endIndex = 0; endIndex < endsNo; endIndex++) {
            ends.push([]);
        }
        return ends;
    }

    getEmptyResults(roundsNo, endsNo) {
        let results = [];
        let ends = this.getEmptyEndsResults(endsNo);

        for (let index = 0; index < roundsNo; index++) {
            results.push(ends.slice(0));
        }
        return results;
    }

    render() {
        return <div>{({
            OnFace: (
                <TargetFace 
                    arrowsSet={this.props.arrowsSet} 
                    round={this.props.round} 
                    withArrowNumbers={false} 
                    targetFace={this.props.targetFace} 
                    arrowPoints={this.state.end} 
                    onArrowPointsChanged={() => {}} 
                    onSaveArrowPoints={() => {}} 
                />
            ),
            OnFaceWithArrowNumbers: (
                <TargetFace 
                    arrowsSet={this.props.arrowsSet} 
                    round={this.props.round} 
                    withArrowNumbers={true}
                    targetFace={this.props.targetFace}
                    arrowPoints={this.state.end}
                    onArrowPointsChanged={() => {}}
                    onSaveArrowPoints={() => {}}
                />                
            ),
            default: (
                <div>This scoring is in invalid format. Please try to create a new one.</div>
            )
        }[this.props.scoringType || 'default'])}

            <Snackbar
                open={this.state.showMessage}
                message={this.state.message}
                autoHideDuration={2000}
                onRequestClose={() => this.setState({ showMessage: false, message: '' })} />
        </div>;
    }
}

const getScoreRound = (score, roundNo) => {
    if (!score || !score.results || !score.results[roundNo]) {
        return undefined;
    }
    return score.results[roundNo].reduce(function(a, b){ return a.concat(b); });
};

const getRound = (score, roundNo) => {
    if (!score || !score.tournamentRound || !score.tournamentRound.rounds[roundNo]) {
        return undefined;
    }
    return score.tournamentRound.rounds[roundNo];
};

const getTargetFace = (score, roundNo) => {
    let round = getRound(score, roundNo);
    return round ? round.targetFace : null;
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        scoreId: props.match.params.id,
        score: state.scores.score,
        arrowsSet: state.scores.score ? state.scores.score.arrowsSet : undefined,
        scoringType: state.scores.score ? state.scores.score.scoringType : undefined,
        roundNo: props.match.params.roundNo,
        scoreEnd: getScoreRound(state.scores.score, props.match.params.roundNo),
        round: getRound(state.scores.score, props.match.params.roundNo),
        targetFace: getTargetFace(state.scores.score, props.match.params.roundNo),
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateScoreAsync,
    loadScoreByIdAsync,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreSummary)
