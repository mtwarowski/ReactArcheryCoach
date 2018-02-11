import React, { Component } from 'react';
import { database } from '../firebase.js';

class Bows extends Component {
  constructor(props) {
    super(props);    
    
    this.state = {
      user: props.user,
      token: null,
      bows: null,
      handleUserDataChange: this.props.handleUserDataChange
    };
  }

  componentDidMount() {
  }
  
 
  componentDidUpdate(prevProps, prevState) {
    if (this.props.user && !this.state.bows) {
    const itemsRef = database.ref('userData/' + this.props.user.uid + '/bows');
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

