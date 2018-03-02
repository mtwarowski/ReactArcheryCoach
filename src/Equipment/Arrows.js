import React, { Component } from 'react';
import { database, auth } from '../Auth/firebase.js';

import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

class Arrows extends Component {
  constructor(props) {
    super(props);    
    
    this.onImageChanged = this.onImageChanged.bind(this);
    this.state = {
      imageData: ''
    };

    // this.state = {
    //   token: null,  
    //   bows: null,
    //   handleUserDataChange: this.props.handleUserDataChange
    // };
  }

  // componentDidMount() {
  //   var user = auth.currentUser;
  //   if (!this.state.arrows && user) {
  //     const itemsRef = database.ref('userData/' + user.uid + '/arrows');
  //     itemsRef.on('value', (snapshot) => {
  //         let bows = snapshot.val();
  //         let newState = [];
  
  //         for (let key in bows) {
  //           newState.push(bows[key]);
  //         }
  
  //         this.setState({
  //           bows: newState
  //         });
  //     });
  
  //     }
  // }
  
 
  // componentDidUpdate(prevProps, prevState) {
  //   var user = auth.currentUser;
  //   if (user && !this.state.bows) {
  //   const itemsRef = database.ref('userData/' + user.uid + '/bows');
  //   itemsRef.on('value', (snapshot) => {
  //       let bows = snapshot.val();
  //       let newState = [];

  //       for (let key in bows) {
  //         newState.push(bows[key]);
  //       }

  //       this.setState({
  //         bows: newState
  //       });
  //   });

  //   }
  // }


    //   name: string;
    // diameterInMm: number;
    
    // shaftType: string;
    // amoLengthInCm: number;
    // vanes: string;
    // nocks: string;
    // comment: string;

  onImageChanged(e){

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => this.setState({ file: file, imagePreviewUrl: reader.result });
    reader.readAsDataURL(file);
  }

  

  
  render() {
    return (
      <div>
        {/* {
          this.state.bows ? 
          this.state.bows.map((bow, index) => (
            <div key={index}>{bow.brand}</div>
        )) : <div>No data</div>
        } */}
         <Avatar
            src={this.state.imagePreviewUrl}
            size={200}
        /> 

        <img src={this.state.imagePreviewUrl} />
        <RaisedButton
          containerElement='label' // <-- Just add me!
          label='My Label'>
          <input onChange={this.onImageChanged} type="file" />
        </RaisedButton>
      </div>
    );
  }
}
export default Arrows;

