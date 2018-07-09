import React, { Component } from 'react';

import PaginationBar from '../../components/PaginationBar.js'
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

 import { loadScoresPageAsync } from '../../actions/scores'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Scores extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedPageChanged = this.handleSelectedPageChanged.bind(this);
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

  render() {
    return (
      <div className="Scores">
        <PaginationBar pageNumber={this.props.pageNumber} pageSize={this.props.pageSize} itemCount={this.props.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged} />
        
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
