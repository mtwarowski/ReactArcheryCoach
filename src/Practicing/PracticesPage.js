import React, { Component } from 'react';
import PaginationBar from '../PaginationBar.js'
import AddPracticeForm from './AddPracticeForm.js'
import PracticesCards from './PracticesCards'

class PracticesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNumber: 1,
      itemCount: null,
    };
  }


  handleSelectedPageChanged(pageNumber){
    this.setState({ pageNumber: pageNumber });
  }

  handleItemNumberChanged(itemCount){
    this.setState({ itemCount: itemCount });
  }

  render() {
    return (
      <div className="Practices">
        <AddPracticeForm />
        <PracticesCards  pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} handleItemNumberChanged={this.handleItemNumberChanged.bind(this)}  />
        <PaginationBar pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} itemCount={this.state.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged.bind(this)} />
    </div>
    );
  }
}

export default PracticesPage;