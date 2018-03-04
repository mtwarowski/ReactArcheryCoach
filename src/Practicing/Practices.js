import React, { Component } from 'react';

import PaginationBar from '../PaginationBar.js'
import PracticesCards from './PracticesCards'
import LinkFloatingActionButton from '../Layout/LinkFloatingActionButton';

class Practices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNumber: 1,
      itemCount: null,
    };
  }


  handleSelectedPageChanged(pageNumber) {
    this.setState({ pageNumber: pageNumber });
  }

  handleItemNumberChanged(itemCount) {
    this.setState({ itemCount: itemCount });
  }

  render() {

    return (
      <div className="Practices">
        <PaginationBar pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} itemCount={this.state.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged.bind(this)} />
        <PracticesCards pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} handleItemNumberChanged={this.handleItemNumberChanged.bind(this)} />
        
        <LinkFloatingActionButton url="/practices/new" />
      </div>
    );
  }
}

export default Practices;