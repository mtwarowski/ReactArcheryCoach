import React, { Component } from 'react';
import { database, auth } from '../Auth/firebase.js';

class Bows extends Component {
  constructor(props) {
    super(props);    
    
    this.state = {
      token: null,
      bows: null,
      handleUserDataChange: this.props.handleUserDataChange
    };
  }

  componentDidMount() {
    var user = auth.currentUser;
    if (!this.state.bows && user) {
      const itemsRef = database.ref('userData/' + user.uid + '/bows');
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
    var user = auth.currentUser;
    if (user && !this.state.bows) {
    const itemsRef = database.ref('userData/' + user.uid + '/bows');
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
            <div key={index}>{bow.brand}</div>
        )) : <div>No data</div>
        }
      </div>
    );
  }
}
export default Bows;

