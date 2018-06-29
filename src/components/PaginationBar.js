import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class PaginationBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      handleSelectedPageChanged: props.handleSelectedPageChanged,
      pagingButtons: [],
      previewsButton: {},
      nextButton: {},
    };
  }

  componentDidMount() {
    if (this.props.pageNumber || this.props.pageSize || this.props.itemCount) {
      this.getPagingButtons(this.props.pageNumber, this.props.pageSize, this.props.itemCount);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageNumber !== prevProps.pageNumber || this.props.pageSize !== prevProps.pageSize || this.props.itemCount !== prevProps.itemCount) {
      this.getPagingButtons(this.props.pageNumber, this.props.pageSize, this.props.itemCount);
    }
  }

  getPagingButtons(pageNumber, pageSize, itemCount) {
    var result = [];
    var maxPageNumber = itemCount / pageSize;

    this.setState({ previewsButton: { pageNumber: pageNumber - 1, displayValue: "<", isEnabled: (pageNumber - 1) > 0 } });
    this.setState({ nextButton: { pageNumber: pageNumber + 1, displayValue: ">", isEnabled: pageNumber < maxPageNumber } });


    // result.push({pageNumber: pageNumber, displayValue: pageNumber, isEnabled: false });
    result.push({ pageNumber: pageNumber - 1, displayValue: "<", isEnabled: (pageNumber - 1) > 0 });
    result.push({ pageNumber: pageNumber + 1, displayValue: ">", isEnabled: pageNumber < maxPageNumber });
    this.setState({ pagingButtons: result });
  }

  render() {

    return (
      <div>
        <FloatingActionButton mini={true} onClick={() => this.state.handleSelectedPageChanged(this.state.previewsButton.pageNumber)}
          disabled={!this.state.previewsButton.isEnabled}>
          <KeyboardArrowLeft />
        </FloatingActionButton>
        <FloatingActionButton mini={true} onClick={() => this.state.handleSelectedPageChanged(this.state.nextButton.pageNumber)}
          disabled={!this.state.nextButton.isEnabled}>
          <KeyboardArrowRight />
        </FloatingActionButton>
      </div>
    );
  }
}
export default PaginationBar;