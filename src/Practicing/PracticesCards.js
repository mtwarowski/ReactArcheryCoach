import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers'
import Config from '../Config'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar/Avatar';

class PracticesCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practices: null,
      handleItemNumberChanged: props.handleItemNumberChanged
    };

    this.practiceApiBaseUrl = new Config().PracticeApiBaseUrl;
  }

  componentDidMount() {
    if (!this.state.practices) {
      this.getAllPractices(this.props.pageNumber, this.props.pageSize);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageNumber !== prevProps.pageNumber || this.props.pageSize !== prevProps.pageSize) {
      this.getAllPractices(this.props.pageNumber, this.props.pageSize);
    }
  }

  getAllPractices(pageNumber, pageSize) {
    var queryString = this.practiceApiBaseUrl + 'api/practice/pagination?pageNumber=' + pageNumber + '&pageSize=' + pageSize

    axios.get(queryString, {
      headers: HttpHelpers.getHttpHeaders()
    })
      .then(res => {
        const pagingResult = res.data;
        this.setState({
          itemCount: pagingResult.itemCount,
          practices: pagingResult.data,
        }, () => this.state.handleItemNumberChanged(this.state.itemCount));
      });
  }

  handlePracticeDelete(practiceId) {
    if (!practiceId) {
      return;
    }

    var queryString = this.practiceApiBaseUrl + 'api/practice/' + practiceId;

    axios.delete(queryString, {
      headers: HttpHelpers.getHttpHeaders()
    })
      .then(res => {
        this.getAllPractices(this.state.token);
      });
  }

  getTimeTextFromTimeSpam(unix_timestamp){
    var date = new Date(unix_timestamp*1000);
    return date.toDateString();
  }

  render() {

    const styles = {
      cardContainer: {
        marginTop: 10,
      },      
      card: {
        margin: 10,
      }
    }
    return (
      <div style={styles.cardContainer} className="row">
        {!this.state.practices ? <div>Unable to load practices.</div>
          : this.state.practices.map((practice, index) => (
            <div key={practice.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-2">
              <Card style={styles.card}>
                <CardHeader
                  title={practice.name}
                  subtitle={practice.practiceDateTimeStamp}
                  avatar={
                    <Avatar>{practice.totalValue}</Avatar>
                  }
                />
                <CardText>
                  <div><span>{practice.name} {this.getTimeTextFromTimeSpam(practice.practiceDateTimeStamp)}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => this.handlePracticeDelete(practice.id)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }
      </div>
    );
  }
}

export default PracticesCards;