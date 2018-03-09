import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500 } from 'material-ui/styles/colors';

import LinkFloatingActionButton from '../Layout/LinkFloatingActionButton';

class Bows extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      bows: null,
      handleUserDataChange: this.props.handleUserDataChange
    };

    this.authService = new AuthService();    
    
    this.handleBowDelete = this.handleBowDelete.bind(this);
  }

  componentDidMount() {
    var userId = this.authService.getUserId();
    if (!this.state.bows && userId) {
      const itemsRef = database.ref('userData/' + userId + '/bows');
      itemsRef.on('value', (snapshot) => {
        let bows = snapshot.val();
        let newState = [];

        for (let key in bows) {
          let bow = bows[key];
          bow.key = key;
          newState.push(bow);
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
          let bow = bows[key];
          bow.key = key;
          newState.push(bow);
        }


        this.setState({
          bows: newState
        });
      });

    }
  }

  handleBowDelete(key) {
    if (!key) {
      return;
    }

    let itemsRef = database.ref('userData/' + userId + '/bows/' + key);

    var userId = this.authService.getUserId();
    database.ref('userData/' + userId + '/bows/' + key).remove().then(function () {
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
        {!this.state.bows ? <div>Unable to load bows.</div>
          : this.state.bows.map((bow, index) => (
            <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <Card style={styles.card}>
                <CardMedia overlay={<CardTitle title={bow.name} subtitle={bow.brand} />}>
                  {
                    bow.image ?
                      <img src={bow.image} alt="" />
                      : <img src="bow.png" alt="" />

                  }
                </CardMedia>
                <CardText>
                  <div><span>{bow.description}</span></div>
                </CardText>
                <CardText>
                  {bow.sightMarks ? bow.sightMarks.map((sighMark) => (<div><span></span>{sighMark.value}<span> at </span><span>{sighMark.distance}</span></div>)) : ''}
                </CardText>
                <CardText>
                  <div><span>BowType:</span><span>{bow.bowType}</span></div>
                  <div><span>DrawWeight:</span><span>{bow.drawWeight}</span></div>
                  <div><span>BraceHeight:</span><span>{bow.braceHeight}</span></div>
                  <div><span>BowString:</span><span>{bow.bowString}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => this.handleBowDelete(bow.key)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }

        <LinkFloatingActionButton url="/bows/new" />
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
    // image: string; (bytes)