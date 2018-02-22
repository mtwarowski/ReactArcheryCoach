import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500 } from 'material-ui/styles/colors';

import PaginationBar from '../PaginationBar.js'
import PracticesCards from './PracticesCards'

class Practices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 2,
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
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      }
    }

    return (
      <div className="Practices">
        <PaginationBar pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} itemCount={this.state.itemCount} handleSelectedPageChanged={this.handleSelectedPageChanged.bind(this)} />
        <PracticesCards pageNumber={this.state.pageNumber} pageSize={this.state.pageSize} handleItemNumberChanged={this.handleItemNumberChanged.bind(this)} />

        <Link to="/practices/new" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

export default Practices;