import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TargetFace } from './TargetFace'
import { updateScoreAsync, loadScoreByIdAsync } from '../../actions/scores'

class GroupingScore extends Component {
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
    }

    render() {
        return <div>
            {this.props.targetFace && <TargetFace 
                arrowsSet={this.props.arrowsSet}  
                round={this.props.round}
                withArrowNumbers={false} 
                end={this.props.scoreEnd} 
                targetFace={this.props.targetFace}
            />}
        </div>;
    }
}

const getRound = (score) => {
    if (!score || !score.tournamentRound || !score.tournamentRound.rounds[0]) {
        return undefined;
    }
    return score.tournamentRound.rounds[0];
};

const getTargetFace = (score) => {
    let round = getRound(score);
    return round ? round.targetFace : null;
}

const getScoreEnd = (score) => {
    if (!score || !score.results) {
        return undefined;
    }    
    return score.results.reduce(function(a, b){ return a.concat(b); })
    .reduce(function(a, b){ return a.concat(b); });
};

const mapStateToProps = (state, props) => {
    return {
        ...props,
        scoreId: props.match.params.id,
        score: state.scores.score,
        arrowsSet: state.scores.score ? state.scores.score.arrowsSet : undefined,
        scoringType: state.scores.score ? state.scores.score.scoringType : undefined,
        round: getRound(state.scores.score),
        scoreEnd: getScoreEnd(state.scores.score),
        targetFace: getTargetFace(state.scores.score),
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateScoreAsync,
    loadScoreByIdAsync,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupingScore)
