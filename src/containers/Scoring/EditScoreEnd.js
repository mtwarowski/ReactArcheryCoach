import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TargetFace } from './TargetFace'
import { updateScoreAsync, loadScoreByIdAsync } from '../../actions/scores'
import ArrowNumberSelectorBar from './TargetFace/ArrowNumberSelectorBar'
import EndPoint from './TargetFace/EndPoint'

import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { navigateTo } from '../../helpers/navigation'
import { sortByValue } from '../../helpers/points'

class SelectByNumbersEndPoints extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scoringPoints: [],
            availableArrowNumbers: [],
            arrowPointsSelected: undefined,
        };

        this.handleScoringPointsClick = this.handleScoringPointsClick.bind(this);
        this.handleArrowNumberSelected = this.handleArrowNumberSelected.bind(this);
        this.handleRemoveScoringPointsClick = this.handleRemoveScoringPointsClick.bind(this);
    }

    componentDidMount() {
        this.setState({ scoringPoints: this.getScoringPoints(this.props.round), availableArrowNumbers: this.props.arrowsSet ? this.props.arrowsSet.labels : [] });
    }


    getScoringPoints(round) {
        let targets = round.targetFace.targets;
        if (!targets) return [];

        var allZones = [];

        for (let i = 0; i < targets.length; i++) {
            targets[i].forEach(t => allZones.push(t));
        }

        return sortByValue(allZones.map(item => { return { displayValue: item.displayValue, value: item.value, backgroundColor: item.backgroundColor, lineColor: item.lineColor } }));
    }

    handleArrowNumberSelected(arrowNo) {
        let newEnd = this.props.end.slice(0);
        let newEndPoint = { ...this.state.arrowPointsSelected, arrowNo };
        //remove undefined fields
        Object.keys(newEndPoint).forEach(key => newEndPoint[key] === undefined && delete newEndPoint[key]);
        newEnd.push(newEndPoint);

        this.setState({ arrowPointsSelected: undefined, availableArrowNumbers: this.state.availableArrowNumbers.filter(x => x !== arrowNo) }, () => {
            this.props.onEndChanged(newEnd);
        });
    }

    handleScoringPointsClick(point) {
        if (this.state.availableArrowNumbers) {
            this.setState({ arrowPointsSelected: point, });
        } else {
            let newEnd = this.props.end.slice(0);
            newEnd.push({ ...point });
            this.props.onEndChanged(newEnd);
        }
    }

    handleRemoveScoringPointsClick(point) {
        let newEnd = this.props.end.filter(x => x !== point);
        this.props.onEndChanged(newEnd);
    }

    render() {
        return <div className="row">
            <div className="col-xs-8 col-md-10 col-lg-11">
                {this.props.end.map((point, index) => <EndPoint key={index} point={point} onArrowPointSelected={this.handleRemoveScoringPointsClick} />)}
            </div>
            <div className="col-xs-4 col-md-2 col-lg-1">
                {this.state.scoringPoints.map(x => <RaisedButton key={x.displayValue} onClick={() => this.handleScoringPointsClick(x)} >
                    {x.displayValue}
                </RaisedButton>
                )}
            </div>
            <ArrowNumberSelectorBar availableArrowNumbers={this.state.availableArrowNumbers} handleArrowNumberSelected={this.handleArrowNumberSelected} />
        </div>
    }
}

class EditScoreEnd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            end: [],
            showMessage: false,
            message: ''
        };

        this.onEndChanged = this.onEndChanged.bind(this);
        this.onSaveEnd = this.onSaveEnd.bind(this);
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

    onEndChanged(newEnd) {
        // if (newEnd.length > this.props.round.arrowsPairEnd) {
        //     this.setState({ showMessage: true, message: 'Sorry: Everyone would like to score ' + newEnd.length + ' arrows on ' + this.props.round.arrowsPairEnd + ' arrows end.' });
        //     return;
        // }
        // this.setState({ end: newEnd });

        newEnd.length > this.props.round.arrowsPairEnd ?
            this.setState({ showMessage: true, message: `Sorry: Everyone would like to score ${newEnd.length} arrows on ${this.props.round.arrowsPairEnd} arrows end.` })
            : this.setState({ end: newEnd })

        // if (newEnd.length === this.props.round.arrowsPairEnd) {
        //     let score = { ...this.props.score };
        //     let scoreResults = score.results || this.getEmptyResults(this.props.score.tournamentRound.rounds.length, this.props.round.numberOfEnds);
        //     let scoreResultsEnds = scoreResults[this.props.roundNo] || this.getEmptyEndsResults(this.props.round.numberOfEnds);
        //     scoreResultsEnds[this.props.endNo] = newEnd;
        //     scoreResults[this.props.roundNo] = scoreResultsEnds;
        //     score.results = scoreResults;

        //     this.props.updateScoreAsync(this.props.scoreId, score);
        //     navigateTo(`./scores/${this.props.scoreId}`);
        // }
    }

    onSaveEnd() {
        let score = { ...this.props.score };
        let scoreResults = score.results || this.getEmptyResults(this.props.score.tournamentRound.rounds.length, this.props.round.numberOfEnds);
        let scoreResultsEnds = scoreResults[this.props.roundNo] || this.getEmptyEndsResults(this.props.round.numberOfEnds);
        scoreResultsEnds[this.props.endNo] = this.state.end;
        scoreResults[this.props.roundNo] = scoreResultsEnds;
        score.results = scoreResults;

        this.props.updateScoreAsync(this.props.scoreId, score);
        navigateTo(`./scores/${this.props.scoreId}`);
    }

    render() {
        return <div>{({
            OnlyNumbers: (
                <div className="mainContainer">
                    <SelectByNumbersEndPoints round={this.props.round} arrowsSet={null} end={this.state.end} onEndChanged={this.onEndChanged} onSaveEnd={this.onSaveEnd} />
                </div>
            ),
            OnlyNumbersWithArrowNumbers: (
                <div className="mainContainer">
                    <SelectByNumbersEndPoints className="mainContainer" round={this.props.round} arrowsSet={this.props.arrowsSet} end={this.state.end} onEndChanged={this.onEndChanged} onSaveEnd={this.onSaveEnd} />
                </div>
            ),
            OnFace: (
                <TargetFace arrowsSet={this.props.arrowsSet} round={this.props.round} withArrowNumbers={false} targetFace={this.props.targetFace} end={this.state.end} onEndChanged={this.onEndChanged} onSaveEnd={this.onSaveEnd} />
            ),
            OnFaceWithArrowNumbers: (
                <TargetFace arrowsSet={this.props.arrowsSet} round={this.props.round} withArrowNumbers={true} targetFace={this.props.targetFace} end={this.state.end} onEndChanged={this.onEndChanged} onSaveEnd={this.onSaveEnd} />
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

const getScoreEnd = (score, roundNo, endNo) => {
    if (!score || !score.results || !score.results[roundNo] || !score.results[roundNo][endNo]) {
        return undefined;
    }
    return score.results[roundNo][endNo];
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
        endNo: props.match.params.endNo,
        scoreEnd: getScoreEnd(state.scores.score, props.match.params.roundNo, props.match.params.endNo),
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
)(EditScoreEnd)
