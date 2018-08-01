import React, { Component } from 'react';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { database } from '../../Auth/firebase.js';
import AuthService from '../../Auth/AuthService';

import {navigateTo} from '../../helpers/navigation'
import ImagePicker from '../../components/ImagePicker'

export default class AddArrowForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            vanes: '',
            comment: '',
            shaftType: '',
            nocks: '',
            amoLengthInCm: 75,
            diameterInMm: 50,
            labels: this.getDefaultLabels(),

            image: '',
            imageName: 'Choose an Image',       
        };
        this.authService = new AuthService();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
    }

    clearState() {
        this.setState({
            name: '',
            vanes: '',
            comment: '',
            shaftType: '',
            nocks: '',
            amoLengthInCm: 75,
            diameterInMm: 5,
            labels: this.getDefaultLabels(),

            image: '',
            imageName: 'Choose an Image',       
        });
    }

    getDefaultLabels(){
        let labels = [];
        for (let index = 1; index <= 12; index++) {
            labels.push(index.toString());
        }
        return labels;
    }

    handleOnImageSelected(imagePickerState) {
        this.setState({ file: imagePickerState.file, image: imagePickerState.image, imageName: imagePickerState.file.name });
    }

    handleSubmit(event) {

        event.preventDefault();
        var userId = this.authService.getUserId();
        database.ref('userData/' + userId + '/arrows').push({            
            name: this.state.name,
            vanes: this.state.vanes,
            comment: this.state.comment,
            shaftType: this.state.shaftType,
            nocks: this.state.nocks,
            amoLengthInCm: this.state.amoLengthInCm,
            diameterInMm: this.state.diameterInMm,

            image: this.state.image,
            imageName: this.state.imageName,
            labels: this.state.labels,
        }).then(function () {
            this.clearState();
            //this.props.history.push('/arrows/');
            navigateTo('/arrows/');
        }.bind(this)).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Card>
                    <CardTitle title="New Arrows" />
                    <CardText>
                        <TextField placeholder="Name" name="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Vanes" name="vanes" value={this.state.vanes} onChange={(event) => this.setState({ vanes: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Comment" name="comment" value={this.state.comment} onChange={(event) => this.setState({ comment: event.target.value })} fullWidth={true} />

                        <TextField placeholder="Shaft Type" name="shaftType" value={this.state.shaftType} onChange={(event) => this.setState({ shaftType: event.target.value })} fullWidth={true} />

                        <TextField type="number" placeholder="Amo Length In Cm" name="amoLengthInCm" value={this.state.amoLengthInCm} onChange={(event) => this.setState({ amoLengthInCm: event.target.value })} fullWidth={true} />
                        
                        <TextField type="number" placeholder="Diameter In Mm" name="diameterInMm" value={this.state.diameterInMm} onChange={(event) => this.setState({ diameterInMm: event.target.value })} fullWidth={true} />
                        
                        <div>{this.state.labels.map(x => <span>Label: {x}</span>)}</div>
                        
                        <ImagePicker label="Select Image" handleImageDataSelected={this.handleOnImageSelected} />
                    </CardText>
                    <CardActions>
                        <FlatButton type="submit" value="Submit" label="Submit" />
                    </CardActions>
                </Card>
            </form>
        );
    }
}
