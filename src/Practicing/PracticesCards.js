import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers'

const practiceApiBaseUrl = "http://localhost:56617/";
class PracticesCards extends Component {
    constructor(props) {
      super(props);
      this.state = {
        practices: null,
        handleItemNumberChanged: props.handleItemNumberChanged
      };
    }  
  
    componentDidMount() {
        if(!this.state.practices){
            this.getAllPractices(this.props.pageNumber, this.props.pageSize);
        }
    }
   
    componentDidUpdate(prevProps, prevState) {
      if (this.props.pageNumber !== prevProps.pageNumber || this.props.pageSize !== prevProps.pageSize) {
        this.getAllPractices(this.props.pageNumber, this.props.pageSize);
      }
    }  
  
    getAllPractices(pageNumber, pageSize){  
      var queryString = practiceApiBaseUrl + 'api/practice/pagination?pageNumber=' + pageNumber + '&pageSize=' + pageSize
  
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
    
    handlePracticeDelete(practiceId){
      if(!practiceId){
        return;
      }
  
      var queryString = practiceApiBaseUrl + 'api/practice/' + practiceId;
      
      axios.delete(queryString, {
        headers: HttpHelpers.getHttpHeaders()
      })
      .then(res => {
        this.getAllPractices(this.state.token);
      });
    }
  
  
    render(){
      return(
        !this.state.practices ? <div>Unable to load practices.</div>
        : this.state.practices.map((practice, index) => (
            <div key={practice.id}><span>{practice.name} {practice.practiceDateTimeStamp}</span><button onClick={() => this.handlePracticeDelete(practice.id)}>Delete</button></div>
        ))
      );
    }
  }

  export default PracticesCards;