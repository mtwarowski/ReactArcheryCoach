import React, { Component } from 'react';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {navigateTo} from '../../helpers/navigation'
import { database } from '../../Auth/firebase.js';

import MultiRowSelector from '../../components/MultiRowSelector';

import ImagePicker from '../../components/ImagePicker'

class AddBowForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            size: null,
            description: '',
            sightMarkRows: [],
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
        this.handleSelectedBowTypeChange = this.handleSelectedBowTypeChange.bind(this);
    }

    clearState() {
        this.setState({
            name: '',
            brand: '',
            size: null,
            description: '',
            sightMarkRows: [],
            bowType: '',

            drawWeight: null,
            braceHeight: '',
            bowString: '',

            image: '',
            imageName: 'Choose an Image'
        });
    }

    handleOnImageSelected(imagePickerState) {
        this.setState({ file: imagePickerState.file, image: imagePickerState.image, imageName: imagePickerState.file.name });
    }

    handleSelectedBowTypeChange(event, index, value) {
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
            brand: this.state.brand,
            size: this.state.size,
            description: this.state.description,
            image: this.state.image,

            
            drawWeight: this.state.drawWeight,
            braceHeight: this.state.braceHeight,
            bowString: this.state.bowString,

            sightMarks: this.state.sightMarkRows.map((row) => ({ distance: row.label, value: row.value }))
        }).then(function () {
            this.clearState();
            navigateTo(`./bows/`);
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


                        <TextField placeholder="Draw Weight" name="drawWeight" type="number" value={this.state.drawWeight} onChange={(event) => this.setState({ drawWeight: event.target.value })} fullWidth={true} />
                        <TextField placeholder="Brace Height" name="braceHeight" value={this.state.braceHeight} onChange={(event) => this.setState({ braceHeight: event.target.value })} fullWidth={true} />
                        <TextField placeholder="Bow String" name="bowString" value={this.state.bowString} onChange={(event) => this.setState({ bowString: event.target.value })} fullWidth={true} />

                        <SelectField floatingLabelText="Bow Type"
                            value={this.state.selectedBowTypeNo}
                            onChange={this.handleSelectedBowTypeChange}
                            fullWidth={true}>
                            {this.state.availableBowTypes.map((availableBowType, index) => (<MenuItem key={availableBowType.no} value={availableBowType.no} primaryText={availableBowType.primaryText} />))}
                        </SelectField>

                        <ImagePicker label="Select Image" handleImageDataSelected={this.handleOnImageSelected} />
                        <MultiRowSelector buttonName="New Sight Mark:" label="mark" value="range" separatorText="at" rows={this.state.sightMarkRows} handleRowsChanges={(rows)=> this.setState({ sightMarkRows: rows })} />
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