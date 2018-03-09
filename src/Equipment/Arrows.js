import React, { Component } from 'react';
import { database, auth } from '../Auth/firebase.js';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import AuthService from '../Auth/AuthService';
import LinkFloatingActionButton from '../Layout/LinkFloatingActionButton';

class Arrows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrows: null,
      handleUserDataChange: this.props.handleUserDataChange
    };

    this.authService = new AuthService();    
    this.handleArrowDelete = this.handleArrowDelete.bind(this);
  }

  componentDidMount() {
    var userId = this.authService.getUserId();
    if (!this.state.arrows && userId) {
      const itemsRef = database.ref('userData/' + userId + '/arrows');
      itemsRef.on('value', (snapshot) => {
        let arrows = snapshot.val();
        let newState = [];

        for (let key in arrows) {
          let arrow = arrows[key];
          arrow.key = key;
          newState.push(arrow);
        }

        this.setState({
          arrows: newState
        });
      });

    }
  }

  componentDidUpdate(prevProps, prevState) {
    var userId = this.authService.getUserId();
    if (!this.state.arrows && userId) {
      const itemsRef = database.ref('userData/' + userId + '/arrows');
      itemsRef.on('value', (snapshot) => {
        let arrows = snapshot.val();
        let newState = [];

        for (let key in arrows) {
          let arrow = arrows[key];
          arrow.key = key;
          newState.push(arrow);
        }


        this.setState({
          arrows: newState
        });
      });

    }
  }

  handleArrowDelete(key) {
    if (!key) {
      return;
    }

    let itemsRef = database.ref('userData/' + userId + '/arrows/' + key);

    var userId = this.authService.getUserId();
    database.ref('userData/' + userId + '/arrows/' + key).remove().then(function () {
    }.bind(this)).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });
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
        {!this.state.arrows ? <div>Unable to load arrows.</div>
          : this.state.arrows.map((arrow, index) => (
            <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <Card style={styles.card}>
                <CardMedia overlay={<CardTitle title={arrow.name} subtitle={arrow.vanes} />}>
                  {
                    arrow.image ?
                      <img src={arrow.image} alt="" />
                      : <img src="bow.png" alt="" />

                  }
                </CardMedia>
                <CardText>
                  <div><span>{arrow.comment}</span></div>
                </CardText>
                <CardText>
                  <div><span>shaftType:</span><span>{arrow.shaftType}</span></div>
                  <div><span>nocks:</span><span>{arrow.nocks}</span></div>
                  <div><span>amoLengthInCm:</span><span>{arrow.amoLengthInCm}</span></div>
                  <div><span>diameterInMm:</span><span>{arrow.diameterInMm}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => this.handlearrowDelete(arrow.key)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }

        <LinkFloatingActionButton url="/arrows/new" />
      </div>
    );
  }
}
export default Arrows;

