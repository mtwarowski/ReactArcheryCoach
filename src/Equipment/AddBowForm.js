import React, { Component } from 'react';
import axios from 'axios';
import HttpHelpers from '../Auth/HttpHelpers';
import Config from '../Config'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import firebase, { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';


class AddBowForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            size: 68,
            description: '',
            sightMarks: [],
            bowType: '',

            drawWeight: 40,
            braceHeight: '',
            bowString: '',

            selectedBowTypeNo: null,
            availableBowTypes: [
                { no: 1, primaryText: 'Recurve' },
                { no: 2, primaryText: 'Barebow' },
                { no: 3, primaryText: 'Compound' },
                { no: 4, primaryText: 'Long Bow' },
                { no: 5, primaryText: 'Hourse Bow' },
                { no: 6, primaryText: 'Yumi' }
        ]};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddNewSightMarks = this.handleAddNewSightMarks.bind(this);
        this.handleSelectedBowTypeChange = this.handleSelectedBowTypeChange.bind(this);

        this.authService = new AuthService();
    }

    clearState() {
        this.setState({
            name: '',
            brand: '',
            size: 68,
            description: '',
            sightMarks: [],
            bowType: '',

            drawWeight: 40,
            braceHeight: '',
            bowString: ''
        });
    }


    handleAddNewSightMarks(){

    }


    handleSelectedBowTypeChange(event, index, value){      
        // var bowTypeName = this.state.availableBowTypes[value].primaryText;
        var bowTypeName = this.state.availableBowTypes.filter((currentBowType) => currentBowType.no === value)[0];

        if(!bowTypeName){
            return;
        }

        this.setState({
             bowType: bowTypeName,
             selectedBowTypeNo: value
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        var userId = this.authService.getUserId();
        database.ref('userData/' + userId + '/bows').push({
            name: this.state.name,
            brand: 'brand' + this.state.name,
            size: 1,
            description: '',
        }).then(function () {
            this.clearState();
        }.bind(this)).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardTitle title="New Bow" />
                    <CardText>
                        <div>
                            <TextField placeholder="Name" name="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} fullWidth={true} />
                        </div>

                        <div>
                            <TextField placeholder="Brand" name="brand" value={this.state.brand} onChange={(event) => this.setState({ brand: event.target.value })} fullWidth={true} />
                        </div>

                        <div>
                            <TextField placeholder="Description" name="description" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} fullWidth={true} />
                        </div>

                        <div>
                            <TextField placeholder="Size" name="size" value={this.state.size} onChange={(event) => this.setState({ size: event.target.value })} fullWidth={true} />
                        </div>

                        <SelectField floatingLabelText="Bow Type"
                            value={this.state.selectedBowTypeNo}
                            onChange={this.handleSelectedBowTypeChange}
                            fullWidth={true}>
                            {this.state.availableBowTypes.map((availableBowType, index) => (<MenuItem key={availableBowType.no} value={availableBowType.no} primaryText={availableBowType.primaryText} />))}
                        </SelectField>
                        <div>
                            <TextField placeholder="Name" name="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} fullWidth={true} />
                        </div>
                        <FlatButton onClick={this.handleAddNewSightMarks} fullWidth={true}>New Sight Mark:</FlatButton>
                        {this.state.sightMarks.map((sightMark, index) => (<div></div>))}
                        {/* <div>
                            <DatePicker placeholder="Choose a date" name="PracticeDate" value={this.state.practiceDate} onChange={(event, date) => this.setState({ practiceDate: date })} fullWidth={true} />
                        </div>
                        <div>
                            <TextField placeholder="Practice comment" name="PracticeComment" value={this.state.practiceComment} onChange={this.handlePracticeCommentChange} fullWidth={true} />
                        </div>
                        <hr />
                        <FlatButton onClick={this.handleAddNewPracticeRound} fullWidth={true}>New Practice Set:</FlatButton>
                        {this.state.practiceRounds.map((practiceRound, index) => (
                            <div key={index}>
                                <TextField placeholder="Rounds" type="number" value={practiceRound.numberOfRound} onChange={(event) => this.handleNumberOfRoundChange(event, index)} />
                                <span> x </span>
                                <TextField placeholder="Arrows No" type="number" value={practiceRound.numberOfTimesPairRound} onChange={(event) => this.handleNumberOfTimesPairRound(event, index)} />
                                <FlatButton onClick={(event) => this.handleDeleteNewPracticeRound(event, index)}>remove</FlatButton>
                                <hr />
                            </div>
                        ))} */}

                    </CardText>
                    <CardActions>
                        <FlatButton type="submit" value="Submit" label="Submit" />
                    </CardActions>
                </Card>
            </form>
        );
    }
}
export default AddBowForm;