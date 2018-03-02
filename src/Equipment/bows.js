import React, { Component } from 'react';
import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

class Bows extends Component {
  constructor(props) {
    super(props);    
    
    this.state = {
      token: null,
      bows: null,
      handleUserDataChange: this.props.handleUserDataChange
    };

    this.authService = new AuthService();
  }

  componentDidMount() {
    var userId = this.authService.getUserId();
    if (!this.state.bows && userId) {
      const itemsRef = database.ref('userData/' + userId + '/bows');
      itemsRef.on('value', (snapshot) => {
          let bows = snapshot.val();
          let newState = [];
  
          for (let key in bows) {
            newState.push(bows[key]);
          }
  
          this.setState({
            bows: newState
          });
      });
  
      }
  }  
 
  componentDidUpdate(prevProps, prevState) {
    var userId = this.authService.getUserId();
    if (!this.state.bows && userId) {
    const itemsRef = database.ref('userData/' + userId + '/bows');
    itemsRef.on('value', (snapshot) => {
        let bows = snapshot.val();
        let newState = [];

        for (let key in bows) {
          newState.push(bows[key]);
        }

        this.setState({
          bows: newState
        });
    });

    }
  }
  
  render() {
    return (
      <div>
        {
          this.state.bows ? 
          this.state.bows.map((bow, index) => (
            <div key={index}><div>{bow.name}</div><div>{bow.brand}</div></div>
        )) : <div>No data</div>
        }
      </div>
    );
  }
}
export default Bows;

    // name: string;
    // brand: string;
    // size: number;
    // description: string;
    // sightMarks: BowSightMark[];
    // bowType: string;

    // drawWeight: number;
    // braceHeight: string;
    // bowString: string;