import React, { Component } from 'react';

import PaginationBar from '../../components/PaginationBar.js'
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

// import {  } from '../../actions/scores'

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
    // this.props.loadParacticesPageAsync({
    //   pageNumber: pageNumber,
    //   pageSize: 20
    // });
  }

  render() {
    return ('no ui');
  }
}

const mapStateToProps = (state, props) => {
  let newProps = {
    ...props,
  }
  return newProps;
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scores)
