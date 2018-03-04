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
import Avatar from 'material-ui/Avatar';

import firebase, { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

class AddArrowForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            size: null,
            description: '',
            sightMarks: [{ mark: 10, range: 70 }],
            bowType: '',

            drawWeight: 40,
            braceHeight: '',
            bowString: '',

            image: '',
            imageName: 'Choose an Image',

            selectedBowTypeNo: null,
            availableBowTypes: [
                { no: 1, primaryText: 'Recurve' },
                { no: 2, primaryText: 'Barebow' },
                { no: 3, primaryText: 'Compound' },
                { no: 4, primaryText: 'Long Bow' },
                { no: 5, primaryText: 'Hourse Bow' },
                { no: 6, primaryText: 'Yumi' }
            ]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
        this.handleAddNewSightMarks = this.handleAddNewSightMarks.bind(this);
        this.handleSelectedBowTypeChange = this.handleSelectedBowTypeChange.bind(this);

        this.authService = new AuthService();
    }

    clearState() {
        this.setState({
            name: '',
            brand: '',
            size: null,
            description: '',
            sightMarks: [],
            bowType: '',

            drawWeight: 40,
            braceHeight: '',
            bowString: '',

            image: '',
            imageName: 'Choose an Image'
        });
    }


    handleOnImageSelected(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onloadend = () => this.setState({ file: file, image: reader.result, imageName: file.name });
            reader.readAsDataURL(file);
        }
    }

    handleAddNewSightMarks() {
        let sightMarks = this.state.sightMarks;
        sightMarks.push({ mark: null, range: null });
        this.setState({ sightMarks: sightMarks });
    }

    handleDeleteSightMark(event, index) {
        event.preventDefault();
        var sightMark = this.state.sightMarks[index];
        var sightMarks = this.state.sightMarks.filter((value) => value !== sightMark);
        this.setState({ sightMarks: sightMarks });
    }

    handleMarkChange(event, index) {
        var sightMarks = this.state.sightMarks;
        sightMarks[index].mark = event.target.value;
        this.setState({ sightMarks: sightMarks });
    }

    handleRangeChange(event, index) {
        var sightMarks = this.state.sightMarks;
        sightMarks[index].range = event.target.value;
        this.setState({ sightMarks: sightMarks });
    }

    handleSelectedBowTypeChange(event, index, value) {
        // var bowTypeName = this.state.availableBowTypes[value].primaryText;
        var bowTypeName = this.state.availableBowTypes.filter((currentBowType) => currentBowType.no === value)[0];

        if (!bowTypeName) {
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
            image: this.state.image,
        }).then(function () {
            this.clearState();
        }.bind(this)).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }

    render() {
        const styles = {
            uploadButton: {
                verticalAlign: 'middle',
            },
            uploadInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };
        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardTitle title="New Bow" />
                    <CardText>

                        <TextField placeholder="Name" name="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Brand" name="brand" value={this.state.brand} onChange={(event) => this.setState({ brand: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Description" name="description" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Size" name="size" type="number" value={this.state.size} onChange={(event) => this.setState({ size: event.target.value })} fullWidth={true} />

                        <SelectField floatingLabelText="Bow Type"
                            value={this.state.selectedBowTypeNo}
                            onChange={this.handleSelectedBowTypeChange}
                            fullWidth={true}>
                            {this.state.availableBowTypes.map((availableBowType, index) => (<MenuItem key={availableBowType.no} value={availableBowType.no} primaryText={availableBowType.primaryText} />))}
                        </SelectField>

                        <FlatButton fullWidth={true}
                            label={this.state.imageName}// "Choose an Image"
                            labelPosition="before"
                            style={styles.uploadButton}
                            containerElement="label">
                            <input type="file" style={styles.uploadInput} onChange={this.handleOnImageSelected} />
                        </FlatButton>

                        {/*<Avatar src={this.state.image} size={30} />
                        <img src={this.state.image} /> */}

                        <FlatButton onClick={this.handleAddNewSightMarks} fullWidth={true}>New Sight Mark:</FlatButton>
                        {this.state.sightMarks.map((sightMark, index) => (
                            <div key={index}>
                                <TextField placeholder="mark" type="number" value={sightMark.mark} onChange={(event) => this.handleMarkChange(event, index)} />
                                <span> at </span>
                                <TextField placeholder="range" type="number" value={sightMark.range} onChange={(event) => this.handleRangeChange(event, index)} />
                                <FlatButton onClick={(event) => this.handleDeleteSightMark(event, index)}>remove</FlatButton>
                                <hr />
                            </div>))}

                        <MultiRowSelector buttonName="test"/>

                    </CardText>
                    <CardActions>
                        <FlatButton type="submit" value="Submit" label="Submit" />
                    </CardActions>
                </Card>
            </form>
        );
    }
}
export default AddArrowForm;