import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadPracticesPageAsync } from '../../actions/practices'

import PracticesCards from './PracticesCards'
import PaginationBar from '../../components/PaginationBar.js'
import LinkFloatingActionButton from '../../components/Layout/LinkFloatingActionButton'

import { LoadingIndicator } from '../../components/LoadingIndicator'

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
        <LoadingIndicator isLoading={this.props.isLoading}>
          <PaginationBar pageNumber={this.props.pageNumber} pageSize={this.props.pageSize} itemCount={this.props.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged} />
          <PracticesCards />
          <LinkFloatingActionButton url="/practices/new" />
        </LoadingIndicator>
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
    practices: state.practices.page.data,
    isLoading: state.practices.isLoading,
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
