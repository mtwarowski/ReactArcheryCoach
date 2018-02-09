import React, { Component } from 'react';

class PaginationBar extends Component{
  
  constructor(props) {
    super(props);

    this.state = {
      handleSelectedPageChanged:  props.handleSelectedPageChanged,
      pagingButtons: []
    };
  }

  componentDidMount() {
    if (this.props.pageNumber || this.props.pageSize || this.props.itemCount) {
      this.setState({
        pagingButtons: this.getPagingButtons(this.props.pageNumber, this.props.pageSize, this.props.itemCount)
      });
    }
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageNumber !== prevProps.pageNumber || this.props.pageSize !== prevProps.pageSize || this.props.itemCount !== prevProps.itemCount) {
      this.setState({
        pagingButtons: this.getPagingButtons(this.props.pageNumber, this.props.pageSize, this.props.itemCount)
      });
    }
  }

  getPagingButtons(pageNumber, pageSize, itemCount){
    var result = [];
    var maxPageNumber = itemCount / pageSize;

    
    result.push({pageNumber: pageNumber - 1, displayValue: "<", isEnabled: (pageNumber - 1) > 0 });
    // result.push({pageNumber: pageNumber, displayValue: pageNumber, isEnabled: false });
    result.push({pageNumber: pageNumber + 1, displayValue: ">", isEnabled: pageNumber < maxPageNumber });

    return result;
  }

  render() {
    return (
    <div>
      {this.state.pagingButtons.map((pagingButton, index) => (
        <button key={pagingButton.pageNumber} onClick={() => this.state.handleSelectedPageChanged(pagingButton.pageNumber)} disabled={!pagingButton.isEnabled}>{pagingButton.displayValue}</button>
      ))}
    </div>
    );
  }
}
export default PaginationBar;