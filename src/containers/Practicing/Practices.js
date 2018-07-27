import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPracticesPageAsync } from '../../actions/practices'

import PracticesCards from './PracticesCards'
import PaginationBar from '../../components/PaginationBar.js'
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

class Practices extends Component {

  constructor(props) {
    super(props);

    this.handleSelectedPageChanged = this.handleSelectedPageChanged.bind(this);
  }

  componentDidMount() {
    this.handleSelectedPageChanged(1);
  }

  handleSelectedPageChanged = (pageNumber) => {
    this.props.loadPracticesPageAsync({
      pageNumber: pageNumber,
      pageSize: 20
    });
  }

  render() {
    return (
      <div className="Practices">
        <PaginationBar pageNumber={this.props.pageNumber} pageSize={this.props.pageSize} itemCount={this.props.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged} />
        <PracticesCards />
        <LinkFloatingActionButton url="/practices/new" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let newProps = {
    ...props,
    pageSize: state.practices.page.pageSize,
    pageNumber: state.practices.page.pageNumber,
    itemCount: state.practices.page.itemCount,
    practices: state.practices.page.data
  }
  return newProps;
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadPracticesPageAsync
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Practices)
