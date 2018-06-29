import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../Config'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import HttpHelpers from '../../Auth/HttpHelpers';
import firebase, { database } from '../../Auth/firebase.js';
import AuthService from '../../Auth/AuthService';

export default class AddArrowForm extends Component {

    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardTitle title="New Arrows" />
                    <CardText>
                    </CardText>
                    <CardActions>
                        <FlatButton type="submit" value="Submit" label="Submit" />
                    </CardActions>
                </Card>
            </form>
        );
    }
}